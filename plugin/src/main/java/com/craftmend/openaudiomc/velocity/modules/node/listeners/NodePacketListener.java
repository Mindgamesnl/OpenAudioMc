package com.craftmend.openaudiomc.velocity.modules.node.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.node.packets.ForwardSocketPacket;
import com.craftmend.openaudiomc.velocity.messages.PacketHandler;
import com.craftmend.openaudiomc.velocity.messages.PacketListener;

import java.util.UUID;

public class NodePacketListener implements PacketListener {

    @PacketHandler
    public void onPacket(ForwardSocketPacket packet) {
        UUID client = packet.getPayload().getClient();
        ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(client);

        if (clientConnection == null) return;
        if (!clientConnection.getIsConnected()) return;

        OpenAudioMc.getService(NetworkingService.class).send(clientConnection, packet.getPayload());
    }

}
