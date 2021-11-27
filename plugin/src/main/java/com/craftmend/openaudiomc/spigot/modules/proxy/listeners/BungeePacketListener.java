package com.craftmend.openaudiomc.spigot.modules.proxy.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.TimeServiceUpdateEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.PlayerSession;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.node.packets.*;
import com.craftmend.openaudiomc.generic.player.User;
import com.craftmend.openaudiomc.generic.player.PlayerService;

import com.craftmend.openaudiomc.velocity.messages.PacketHandler;
import com.craftmend.openaudiomc.velocity.messages.PacketListener;

public class BungeePacketListener implements PacketListener {

    @PacketHandler
    public void onConnect(ClientConnectedPacket packet) {
        ClientConnection connection = OpenAudioMc.getService(NetworkingService.class).getClient(packet.getClientUuid());
        if (connection != null) {
            connection.onConnect();
            for (INetworkingEvents event : OpenAudioMc.getService(NetworkingService.class).getEvents()) {
                event.onClientOpen(connection);
            }
        }
    }

    @PacketHandler
    public void onDisconnect(ClientDisconnectedPacket packet) {
        ClientConnection connection = OpenAudioMc.getService(NetworkingService.class).getClient(packet.getClientUuid());
        if (connection != null) connection.onDisconnect();
    }

    @PacketHandler
    public void onTimeUpdate(ServerUpdateTimePacket packet) {
        OpenAudioMc.getInstance().getServiceManager().replaceService(TimeService.class, packet.getTimeService());
        AudioApi.getInstance().getEventDriver().fire(new TimeServiceUpdateEvent(packet.getTimeService()));
    }

    @PacketHandler
    public void onStateSync(ClientUpdateStatePacket packet) {
        ClientConnection connection = OpenAudioMc.getService(NetworkingService.class).getClient(packet.getClientUuid());
        connection.getClientRtcManager().setMicrophoneEnabled(packet.isMicrophoneEnabled());
        connection.setStreamKey(packet.getStreamId());
        connection.setConnectedToRtc(packet.isEnabled());

        connection.setSession(new PlayerSession(connection, packet.getExplodedToken(), packet.getExplodedToken()));

        // enable the module if it isn't already
        if (!OpenAudioMc.getService(CraftmendService.class).is(CraftmendTag.VOICECHAT)) {
            OpenAudioMc.getService(CraftmendService.class).addTag(CraftmendTag.VOICECHAT);
        }
    }

    @PacketHandler
    public void onHue(ClientSyncHueStatePacket packet) {
        ClientConnection connection = OpenAudioMc.getService(NetworkingService.class).getClient(packet.getClientUuid());
        connection.setHasHueLinked(true);
    }

    @PacketHandler
    public void onCommand(CommandProxyPacket packet) {
        User player = OpenAudioMc.resolveDependency(PlayerService.class).getPlayerByUUID(packet.getCommandProxy().getExecutor());
        if (player == null) return;
        OpenAudioMc.getService(CommandService.class)
                .getSubCommand(packet.getCommandProxy().getCommandProxy().toString().toLowerCase())
                .onExecute(player, packet.getCommandProxy().getArgs());
    }

}
