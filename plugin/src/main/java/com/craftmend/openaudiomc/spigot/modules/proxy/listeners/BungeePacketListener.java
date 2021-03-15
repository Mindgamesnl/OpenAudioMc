package com.craftmend.openaudiomc.spigot.modules.proxy.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.PlayerSession;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.node.packets.*;
import com.craftmend.openaudiomc.spigot.modules.proxy.objects.FakeGenericExecutor;

import com.craftmend.openaudiomc.velocity.messages.PacketHandler;
import com.craftmend.openaudiomc.velocity.messages.PacketListener;

import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

public class BungeePacketListener implements PacketListener {

    @PacketHandler
    public void onConnect(ClientConnectedPacket packet) {
        ClientConnection connection = OpenAudioMc.getInstance().getNetworkingService().getClient(packet.getClientUuid());
        if (connection != null) {
            connection.onConnect();
            for (INetworkingEvents event : OpenAudioMc.getInstance().getNetworkingService().getEvents()) {
                event.onClientOpen(connection);
            }
        }
    }

    @PacketHandler
    public void onDisconnect(ClientDisconnectedPacket packet) {
        ClientConnection connection = OpenAudioMc.getInstance().getNetworkingService().getClient(packet.getClientUuid());
        if (connection != null) connection.onDisconnect();
    }

    @PacketHandler
    public void onStateSync(ClientUpdateStatePacket packet) {
        ClientConnection connection = OpenAudioMc.getInstance().getNetworkingService().getClient(packet.getClientUuid());
        connection.getClientRtcManager().setMicrophoneEnabled(packet.isMicrophoneEnabled());
        connection.setStreamKey(packet.getStreamId());
        connection.setConnectedToRtc(packet.isEnabled());

        connection.setSession(new PlayerSession(true, connection, packet.getExplodedToken(), packet.getExplodedToken()));

        // enable the module if it isn't already
        if (!OpenAudioMc.getInstance().getCraftmendService().is(CraftmendTag.VOICECHAT)) {
            OpenAudioMc.getInstance().getCraftmendService().addTag(CraftmendTag.VOICECHAT);
        }
    }

    @PacketHandler
    public void onHue(ClientSyncHueStatePacket packet) {
        ClientConnection connection = OpenAudioMc.getInstance().getNetworkingService().getClient(packet.getClientUuid());
        connection.setHasHueLinked(true);
    }

    @PacketHandler
    public void onCommand(CommandProxyPacket packet) {
        Player player = Bukkit.getPlayer(packet.getCommandProxy().getExecutor());
        if (player == null) return;
        FakeGenericExecutor fakeGenericExecutor = new FakeGenericExecutor(player);
        OpenAudioMc.getInstance().getCommandModule().getSubCommand(packet.getCommandProxy().getCommandProxy().toString().toLowerCase()).onExecute(fakeGenericExecutor, packet.getCommandProxy().getArgs());
    }

}
