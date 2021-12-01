package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientRtcLocationUpdate;
import com.craftmend.openaudiomc.spigot.services.world.Vector3;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class ClientVoiceSubscribePayload extends AbstractPacketPayload {

    private String targetStreamKey;
    private String targetPlayerName;
    private UUID targetUuid;
    private ClientRtcLocationUpdate location;

    public static ClientVoiceSubscribePayload fromClient(ClientConnection clientConnection, Vector3 targetLocation) {
        return new ClientVoiceSubscribePayload(
                clientConnection.getRtcSessionManager().getStreamKey(),
                clientConnection.getOwner().getName(),
                clientConnection.getOwner().getUniqueId(),
                ClientRtcLocationUpdate.fromClient(clientConnection, targetLocation)
        );
    }

}
