package com.craftmend.openaudiomc.bungee.modules.node.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.node.packets.ForwardSocketPacket;
import com.craftmend.openaudiomc.api.velocitypluginmessageframework.PacketHandler;
import com.craftmend.openaudiomc.api.velocitypluginmessageframework.PacketListener;

import java.util.UUID;

public class NodePacketListener implements PacketListener {

    @PacketHandler
    public void onPacket(ForwardSocketPacket packet) {
        UUID client = packet.payload.getClient();
        ClientConnection clientConnection = OpenAudioMc.getInstance().getNetworkingService().getClient(client);

        if (clientConnection == null) return;
        if (!clientConnection.getIsConnected()) return;

        OpenAudioMc.getInstance().getNetworkingService().send(clientConnection, packet.payload);
    }

}
