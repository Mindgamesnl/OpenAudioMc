package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.helpers.ClientRtcLocationUpdate;
import com.craftmend.openaudiomc.spigot.services.world.Vector3;
import java.util.UUID;

public class ClientVoiceSubscribePayload extends AbstractPacketPayload {
    private SerializedPeer[] peers;


    public static class SerializedPeer {
        private String streamKey;
        private String playerName;
        private UUID playerUuid;
        private ClientRtcLocationUpdate location;
        private VoicePeerOptions options;

        public static SerializedPeer fromClient(ClientConnection clientConnection, ClientConnection originLocation, VoicePeerOptions options) {
            return new SerializedPeer(clientConnection.getRtcSessionManager().getStreamKey(), clientConnection.getOwner().getName(), clientConnection.getOwner().getUniqueId(), ClientRtcLocationUpdate.fromClient(clientConnection, Vector3.from(originLocation)), options);
        }

        public String getStreamKey() {
            return this.streamKey;
        }

        public String getPlayerName() {
            return this.playerName;
        }

        public UUID getPlayerUuid() {
            return this.playerUuid;
        }

        public ClientRtcLocationUpdate getLocation() {
            return this.location;
        }

        public VoicePeerOptions getOptions() {
            return this.options;
        }

        public SerializedPeer(final String streamKey, final String playerName, final UUID playerUuid, final ClientRtcLocationUpdate location, final VoicePeerOptions options) {
            this.streamKey = streamKey;
            this.playerName = playerName;
            this.playerUuid = playerUuid;
            this.location = location;
            this.options = options;
        }
    }

    public SerializedPeer[] getPeers() {
        return this.peers;
    }

    public void setPeers(final SerializedPeer[] peers) {
        this.peers = peers;
    }

    @Override
    public String toString() {
        return "ClientVoiceSubscribePayload(peers=" + java.util.Arrays.deepToString(this.getPeers()) + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientVoiceSubscribePayload)) return false;
        final ClientVoiceSubscribePayload other = (ClientVoiceSubscribePayload) o;
        if (!other.canEqual((Object) this)) return false;
        if (!java.util.Arrays.deepEquals(this.getPeers(), other.getPeers())) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientVoiceSubscribePayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + java.util.Arrays.deepHashCode(this.getPeers());
        return result;
    }

    public ClientVoiceSubscribePayload(final SerializedPeer[] peers) {
        this.peers = peers;
    }
}
