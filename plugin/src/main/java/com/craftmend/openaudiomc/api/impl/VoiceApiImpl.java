package com.craftmend.openaudiomc.api.impl;

import com.craftmend.openaudiomc.api.interfaces.Client;
import com.craftmend.openaudiomc.api.interfaces.VoiceApi;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.objects.VoicePeerOptions;

import java.util.UUID;

public class VoiceApiImpl implements VoiceApi {

    @Override
    public boolean hasPeer(Client haystack, Client needle) {
        return hasPeer(haystack, needle.getUser().getUniqueId());
    }

    @Override
    public boolean hasPeer(Client haystack, UUID needle) {
        ClientConnection clientConnection = (ClientConnection) haystack;
        return clientConnection.getRtcSessionManager().isPeer(needle);
    }

    @Override
    public void updatePeerOptions(Client client, Client peerToUpdate, VoicePeerOptions options) {
        client.updatePeerOptions(peerToUpdate, options);
    }

    private boolean isProximityPeer(Client haystack, Client needle) {
        ClientConnection haystackConnection = (ClientConnection) haystack;
        return haystackConnection.getRtcSessionManager().getCurrentProximityPeers().contains(needle.getUser().getUniqueId());
    }

    public boolean isGlobalPeer(Client haystack, Client needle) {
        ClientConnection haystackConnection = (ClientConnection) haystack;
        return haystackConnection.getRtcSessionManager().getCurrentGlobalPeers().contains(needle.getUser().getUniqueId());
    }

    @Override
    public void addStaticPeer(Client client, Client peerToAdd, boolean visible, boolean mutual) {
        VoicePeerOptions options = new VoicePeerOptions();
        options.setSpatialAudio(false);
        options.setVisible(visible);

        ClientConnection clientConnection = (ClientConnection) client;
        ClientConnection peerConnection = (ClientConnection) peerToAdd;

        if (!clientConnection.getRtcSessionManager().isReady() || !peerConnection.getRtcSessionManager().isReady()) {
            throw new IllegalStateException("Both clients must be ready (connected and have voice chat enabled) before adding a peer");
        }

        if (isProximityPeer(client, peerToAdd)) {
            client.updatePeerOptions(peerToAdd, options);
            clientConnection.getRtcSessionManager().getCurrentGlobalPeers().add(peerToAdd.getUser().getUniqueId());
            clientConnection.getRtcSessionManager().getCurrentProximityPeers().remove(peerToAdd.getUser().getUniqueId());
        } else {
            clientConnection.getRtcSessionManager().getCurrentGlobalPeers().add(peerToAdd.getUser().getUniqueId());
            clientConnection.getPeerQueue().addSubscribe(peerConnection, clientConnection, options);
        }

        if (mutual) {
            addStaticPeer(peerToAdd, client, visible, false);
        }
    }

    @Override
    public void removeStaticPeer(Client client, Client peerToRemove, boolean mutual) {
        if (isGlobalPeer(client, peerToRemove)) {
            ClientConnection clientConnection = (ClientConnection) client;
            ClientConnection peerConnection = (ClientConnection) peerToRemove;
            clientConnection.getRtcSessionManager().getCurrentGlobalPeers().remove(peerToRemove.getUser().getUniqueId());
            clientConnection.getPeerQueue().drop(peerConnection.getRtcSessionManager().getStreamKey());
        }

        if (mutual) {
            removeStaticPeer(peerToRemove, client, false);
        }
    }
}
