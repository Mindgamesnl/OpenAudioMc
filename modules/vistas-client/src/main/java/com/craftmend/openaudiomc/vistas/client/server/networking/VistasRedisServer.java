package com.craftmend.openaudiomc.vistas.client.server.networking;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.driver.AuthenticationDriver;
import com.craftmend.openaudiomc.generic.client.session.ClientAuth;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.proxy.ProxyHostService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.vistas.client.redis.handlers.DefaultPacketHandler;
import com.craftmend.openaudiomc.vistas.client.redis.SimpleRedisClient;
import com.craftmend.openaudiomc.vistas.client.redis.interfaces.IRedisHandler;
import com.craftmend.openaudiomc.vistas.client.redis.packets.*;
import com.craftmend.openaudiomc.vistas.client.users.MinecraftServer;
import com.craftmend.openaudiomc.vistas.client.users.ServerUserHooks;
import lombok.Getter;

import java.util.UUID;

public class VistasRedisServer extends Service {

    @Getter private IRedisHandler packetEvents;
    private SimpleRedisClient redis;

    @Inject
    public VistasRedisServer(Configuration configuration) {
        // setup handler
        packetEvents = new DefaultPacketHandler();
        redis = new SimpleRedisClient(
                configuration.getString(StorageKey.REDIS_HOST),
                configuration.getInt(StorageKey.REDIS_PORT),
                configuration.getString(StorageKey.REDIS_PASSWORD),
                configuration.getBoolean(StorageKey.REDIS_USE_SSL),
                configuration.getString(StorageKey.REDIS_SENTINEL_MASTER_SET),
                packetEvents,
                "server_to_vistas"
        );

        packetEvents.registerPacket(UserJoinPacket.class).setHandler(joinPacket -> {
            getService(ServerUserHooks.class).onUserJoin(
                    joinPacket.getPlayerName(),
                    joinPacket.getPlayerUuid(),
                    joinPacket.getServerId(),
                    joinPacket.getIp()
            );
        });

        packetEvents.registerPacket(UserExecuteAudioCommandPacket.class).setHandler(userExecuteAudioCommandPacket -> {

            // does the user have args?
            ClientAuth authenticationDriver = OpenAudioMc.getService(NetworkingService.class).getClient(userExecuteAudioCommandPacket.getPlayerUuid())
                    .getAuth();

            if (userExecuteAudioCommandPacket.getArgs().length == 0) {
                authenticationDriver.publishSessionUrl();
            } else {
                User sender = OpenAudioMc.resolveDependency(UserHooks.class).byUuid(userExecuteAudioCommandPacket.getPlayerUuid());

                if (sender == null) {
                    OpenAudioLogger.warn("User " + userExecuteAudioCommandPacket.getPlayerUuid() + " is not online, but tried to execute a command");
                    return;
                }
                authenticationDriver.activateToken(sender, userExecuteAudioCommandPacket.getArgs()[0]);
            }
        });

        packetEvents.registerPacket(UserLeavePacket.class).setHandler(leavePacket -> {
            getService(ServerUserHooks.class).onUserLeave(
                    leavePacket.getPlayerName(),
                    leavePacket.getPlayerUuid(),
                    leavePacket.getServerId()
            );
        });

        packetEvents.registerPacket(EvalCommandPacket.class)
                        .setHandler(evalCommandPacket -> {
                            CommandService commandService = OpenAudioMc.getService(CommandService.class);
                            User sender = OpenAudioMc.resolveDependency(UserHooks.class).byUuid(evalCommandPacket.getUserId());
                            String[] args = evalCommandPacket.getCommand();
                            SubCommand subCommand = commandService.getSubCommand(CommandContext.OPENAUDIOMC, args[0].toLowerCase());
                            if (subCommand != null) {
                                if (subCommand.isAllowed(sender)) {
                                    String[] subArgs = new String[args.length - 1];
                                    if (args.length != 1) {
                                        System.arraycopy(args, 1, subArgs, 0, args.length - 1);
                                    }

                                    try {
                                        subCommand.onExecute(sender, subArgs);
                                    } catch (Exception var9) {
                                        var9.printStackTrace();
                                        sender.sendMessage((String) MagicValue.COMMAND_PREFIX.get(String.class) + "An error occurred while executing the command. Please check your command. Type: " + var9.getClass().getSimpleName());
                                    }

                                    return;
                                } else {
                                    sender.sendMessage((String) MagicValue.COMMAND_PREFIX.get(String.class) + "You dont have the permissions to do this, sorry!");
                                    return;
                                }
                            } else {
                                commandService.getSubCommand(CommandContext.OPENAUDIOMC, "help").onExecute(sender, args);
                            }
                        });

        packetEvents.registerPacket(ServerRegisterPacket.class).setHandler(serverRegisterPacket -> {
            getService(ServerUserHooks.class).registerServer(serverRegisterPacket.getServerId());
        });

        packetEvents.registerPacket(ServerClosePacket.class).setHandler(closePacket -> {
            getService(ServerUserHooks.class).unregisterServer(closePacket.getServerId());
        });

        // this would be something that would've been received through a plugin channel
        packetEvents.registerPacket(WrappedProxyPacket.class).setHandler(wrappedProxyPacket -> {
            MinecraftServer installation = getService(ServerUserHooks.class).registerServerIfNew(wrappedProxyPacket.getServerId());
            if (installation == null) {
                OpenAudioLogger.warn("couldn't handle a packet from a server, because, well, I don't have it registered lol " + wrappedProxyPacket.getServerId());
                return;
            }

            User user = OpenAudioMc.resolveDependency(UserHooks.class).byUuid(wrappedProxyPacket.getPlayerId());
            if (wrappedProxyPacket.getPacket() == null) {
                OpenAudioLogger.warn("nill packet for " + user.getName());
                return;
            }
            OpenAudioMc.getService(ProxyHostService.class).onPacketReceive(user, wrappedProxyPacket.getPacket());
        });
    }

    public void sendPacket(AbstractPacketPayload packet, UUID targetServerId) {
        redis.publish("vistas_to_server", OpenAudioMc.getGson().toJson(new InternalPacketWrapper(packet, targetServerId)));
    }

}
