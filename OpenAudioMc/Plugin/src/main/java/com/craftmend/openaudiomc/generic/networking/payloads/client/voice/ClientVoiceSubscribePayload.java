package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.helpers.ClientRtcLocationUpdate;
import com.craftmend.openaudiomc.spigot.services.world.Vector3;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper=false)
@AllArgsConstructor
public class ClientVoiceSubscribePayload extends AbstractPacketPayload {

    private SerializedPeer[] peers;

    @Getter
    @AllArgsConstructor
    public static class SerializedPeer {
        private String streamKey;
        private String playerName;
        private UUID playerUuid;
        private ClientRtcLocationUpdate location;
        private VoicePeerOptions options;

        public static SerializedPeer fromClient(ClientConnection clientConnection, ClientConnection originLocation, VoicePeerOptions options) {
            return new SerializedPeer(
                    clientConnection.getRtcSessionManager().getStreamKey(),
                    clientConnection.getOwner().getName(),
                    clientConnection.getOwner().getUniqueId(),
                    ClientRtcLocationUpdate.fromClient(clientConnection, Vector3.from(originLocation)),
                    options
            );
        }

    }

}
