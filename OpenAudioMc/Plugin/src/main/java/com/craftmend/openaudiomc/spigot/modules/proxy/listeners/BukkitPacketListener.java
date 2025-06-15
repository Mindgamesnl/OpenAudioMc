package com.craftmend.openaudiomc.spigot.modules.proxy.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.client.VoicechatReadyEvent;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.authentication.objects.Key;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.objects.CommandError;
import com.craftmend.openaudiomc.generic.events.events.TimeServiceUpdateEvent;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.handlers.ClientVoiceChanelInteractionHandler;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.oac.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.session.ClientAuth;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.node.packets.*;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.proxy.messages.ProxyPacketHandler;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketListener;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import org.bukkit.Bukkit;

public class BukkitPacketListener implements PacketListener {

    private static final ClientVoiceChanelInteractionHandler CLIENT_VOICE_CHANEL_INTERACTION_HANDLER = new ClientVoiceChanelInteractionHandler();

    @ProxyPacketHandler
    public void onParentUpdate(User user, AnnouncePlatformPacket packet) {
        OpenAudioMc.getService(AuthenticationService.class).setExplicitParentPublicKey(new Key(packet.getParentPublicKey()));
        MagicValue.overWrite(MagicValue.PARENT_PLATFORM, packet.getPlatform());
    }

    @ProxyPacketHandler
    public void onConnect(User user, ClientConnectedPacket packet) {
        ClientConnection connection = OpenAudioMc.getService(NetworkingService.class).getClient(packet.getClientUuid());
        if (connection != null) {
            connection.onConnect();
            for (INetworkingEvents event : OpenAudioMc.getService(NetworkingService.class).getEvents()) {
                event.onClientOpen(connection);
            }
        }
    }

    @ProxyPacketHandler
    public void onDisconnect(User user, ClientDisconnectedPacket packet) {
        ClientConnection connection = OpenAudioMc.getService(NetworkingService.class).getClient(packet.getClientUuid());
        if (connection != null) connection.onDisconnect();
    }

    @ProxyPacketHandler
    public void onTimeUpdate(User user, ServerUpdateTimePacket packet) {
        OpenAudioMc.getInstance().getServiceManager().replaceService(TimeService.class, packet.getTimeService());
        EventApi.getInstance().callEvent(new TimeServiceUpdateEvent(packet.getTimeService()));
    }

    @ProxyPacketHandler
    public void onStateSync(User user, ClientUpdateStatePacket packet) {
        ClientConnection connection = OpenAudioMc.getService(NetworkingService.class).getClient(packet.getClientUuid());
        if (connection == null) {
            return;
        }

        boolean dispatchEvent = !connection.getSession().isConnectedToRtc() && packet.isEnabled();

        connection.getRtcSessionManager().setMicrophoneEnabled(packet.isMicrophoneEnabled());
        connection.getRtcSessionManager().setVoicechatDeafened(packet.isDeafened());
        connection.getRtcSessionManager().setStreamKey(packet.getStreamId());
        connection.getSession().setConnectedToRtc(packet.isEnabled());
        connection.getSession().setVolume(packet.getVolume());
        connection.setAuth(new ClientAuth(connection, packet.getExplodedToken(), packet.getExplodedToken()));

        if (dispatchEvent) {
            EventApi.getInstance().callEvent(new VoicechatReadyEvent(connection));
        }

        // enable the module if it isn't already
        if (!OpenAudioMc.getService(OpenaudioAccountService.class).is(CraftmendTag.VOICECHAT)) {
            OpenAudioMc.getService(OpenaudioAccountService.class).addTag(CraftmendTag.VOICECHAT);
        }
    }

    @ProxyPacketHandler
    public void onCommand(User user, CommandProxyPacket packet) {
        User<?> player = OpenAudioMc.resolveDependency(UserHooks.class).byUuid(packet.getCommandProxy().getExecutor());
        if (player == null) return;
        Bukkit.getScheduler().runTask(OpenAudioMcSpigot.getInstance(), () -> {
            try {
                OpenAudioMc.getService(CommandService.class)
                        .getSubCommand(CommandContext.OPENAUDIOMC, packet.getCommandProxy().getProxiedCommand().toString().toLowerCase())
                        .onExecute(player, packet.getCommandProxy().getArgs());
            } catch (Exception e) {
                if (e instanceof CommandError) {
                    player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + e.getMessage());
                } else {
                    player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "Something went wrong while executing the command. Please check your console for more information.");
                    OpenAudioLogger.error(e, "failed to execute from proxy packet");
                }
            }
        });
    }

    @ProxyPacketHandler
    public void onChannelUiInteraction(User<?> user, ForwardChannelUserInteractionPacket packet) {
        CLIENT_VOICE_CHANEL_INTERACTION_HANDLER.onReceive(packet.getPayload());
    }

}
