package com.craftmend.openaudiomc.vistas.client.client;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.SpigotAudioCommandEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.proxy.service.ProxyNetworkingService;
import com.craftmend.openaudiomc.vistas.client.redis.handlers.DefaultPacketHandler;
import com.craftmend.openaudiomc.vistas.client.Vistas;
import com.craftmend.openaudiomc.vistas.client.redis.SimpleRedisClient;
import com.craftmend.openaudiomc.vistas.client.redis.packets.*;
import org.bukkit.entity.Player;

import java.util.UUID;

public class VistasRedisClient extends Service {

    private DefaultPacketHandler packetEvents;
    private SimpleRedisClient redis;

    @Inject
    public VistasRedisClient(Configuration configuration) {
        // setup handler
        packetEvents = new DefaultPacketHandler();
        packetEvents.setSelfId(Vistas.getInstance().getServerId());
        OpenAudioLogger.toConsole("Connecting to redis server: " + configuration.getString(StorageKey.REDIS_HOST));
        redis = new SimpleRedisClient(
                configuration.getString(StorageKey.REDIS_HOST),
                configuration.getInt(StorageKey.REDIS_PORT),
                configuration.getString(StorageKey.REDIS_PASSWORD),
                packetEvents,
                "deputy_to_server"
        );

        AudioApi.getInstance().getEventDriver().on(SpigotAudioCommandEvent.class)
                .setHandler(spigotAudioCommandEvent -> {
                    if (spigotAudioCommandEvent.getCommandSender() instanceof Player) {
                        spigotAudioCommandEvent.setCanceled(true);
                        sendPacket(new UserExecuteAudioCommandPacket(
                                spigotAudioCommandEvent.getCommandSender().getName(),
                                ((Player) spigotAudioCommandEvent.getCommandSender()).getUniqueId(),
                                spigotAudioCommandEvent.getArgs()
                        ));
                    }
                });

        // handle chat messages etc
        packetEvents.registerPacket(InvokeUserPacket.class).setHandler(invocation -> {
            User user = OpenAudioMc.resolveDependency(UserHooks.class).byUuid(invocation.getPlayerUuid());
            if (user != null) {
                invocation.getCall().setTarget(user);
                invocation.getCall().invokeOn(user);
            }
        });

        packetEvents.registerPacket(AnnounceSelfRequest.class).setHandler(none -> {
            Vistas.getInstance().registerSelf();
        });

        // implement received packets through our fake bungee shit
        packetEvents.registerPacket(WrappedProxyPacket.class).setHandler(wrappedProxyPacket -> {
            // is this targeted at a user?
            User user = null;
            if (wrappedProxyPacket.getPlayerId() != null) {
                user = OpenAudioMc.resolveDependency(UserHooks.class).byUuid(wrappedProxyPacket.getPlayerId());
            }
            try {
                OpenAudioMc.getService(ProxyNetworkingService.class).getPacketManager().dispatchReceivedPacket(
                        wrappedProxyPacket.getPacket().getClass(),
                        user,
                        wrappedProxyPacket.getPacket()
                );
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        });
    }

    public void sendPacket(AbstractPacketPayload packet) {
        redis.publish("server_to_deputy", OpenAudioMc.getGson().toJson(new InternalPacketWrapper(packet, null)));
    }

    public void sendPacket(AbstractPacketPayload packet, UUID serverId) {
        redis.publish("server_to_deputy", OpenAudioMc.getGson().toJson(new InternalPacketWrapper(packet, serverId)));
    }

}
