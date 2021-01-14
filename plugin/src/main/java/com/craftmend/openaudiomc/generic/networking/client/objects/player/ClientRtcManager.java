package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientDropVoiceStream;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientSubscribeToVoice;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceDropPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceSubscribePayload;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class ClientRtcManager {

    @Getter private Set<UUID> subscriptions = new HashSet<>();
    private ClientConnection clientConnection;

    public ClientRtcManager(ClientConnection clientConnection) {
        this.clientConnection = clientConnection;

        this.clientConnection.onDisconnect(() -> {
            // go over all other clients, check if we might have a relations ship and break up if thats the case
            subscriptions.clear();
            makePeersDrop();
        });
    }

    /**
     * Makes two users listen to one another
     * @param peer Who I should become friends with
     * @return If I became friends
     */
    public boolean linkTo(ClientConnection peer) {
        if (!isReady())
            return false;

        if (!peer.getClientRtcManager().isReady())
            return false;

        if (subscriptions.contains(peer.getOwnerUUID()))
            return false;

        if (peer.getClientRtcManager().subscriptions.contains(clientConnection.getOwnerUUID()))
            return false;

        peer.getClientRtcManager().getSubscriptions().add(clientConnection.getOwnerUUID());
        subscriptions.add(peer.getOwnerUUID());

        peer.sendPacket(new PacketClientSubscribeToVoice(ClientVoiceSubscribePayload.fromClient(clientConnection)));
        clientConnection.sendPacket(new PacketClientSubscribeToVoice(ClientVoiceSubscribePayload.fromClient(peer)));

        return true;
    }

    public void makePeersDrop() {
        for (ClientConnection client : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
            if (client.getOwnerUUID() ==  clientConnection.getOwnerUUID())
                continue;

            if (client.getClientRtcManager().subscriptions.remove(clientConnection.getOwnerUUID())) {
                // send unsub packet
                client.sendPacket(new PacketClientDropVoiceStream(new ClientVoiceDropPayload(clientConnection.getStreamKey())));
            }
        }
    }

    public boolean isReady() {
        return clientConnection.isConnected() && clientConnection.isConnectedToRtc();
    }
}
