package com.craftmend.openaudiomc.bungee.modules.node.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.node.packets.ForceMuteMicrophonePacket;
import com.craftmend.openaudiomc.generic.node.packets.ForwardSocketPacket;
import com.craftmend.openaudiomc.velocity.messages.PacketHandler;
import com.craftmend.openaudiomc.velocity.messages.PacketListener;

import java.util.UUID;

/**
 * Receive incoming packets from the underlying server and forward
 * them to the openaudiomc sfu infrastructure, using the bungeecord socket, account and namespaces
 */
public class NodePacketListener implements PacketListener {

    @PacketHandler
    public void onMicDisable(ForceMuteMicrophonePacket packet) {
        OpenAudioMc.getService(NetworkingService.class).getClient(packet.getClient()).getClientRtcManager().allowSpeaking(packet.isCanSpeak());
    }

    @PacketHandler
    public void onPacket(ForwardSocketPacket packet) {
        UUID client = packet.getPayload().getClient();
        ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(client);

        if (clientConnection == null) return;
        if (!clientConnection.getIsConnected()) return;

        OpenAudioMc.getService(NetworkingService.class).send(clientConnection, packet.getPayload());
    }

}
