package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class ClientVoiceSubscribePayload extends AbstractPacketPayload {

    private String targetStreamKey;
    private String targetPlayerName;
    private UUID targetUuid;

    public static ClientVoiceSubscribePayload fromClient(ClientConnection clientConnection) {
        return new ClientVoiceSubscribePayload(
                clientConnection.getStreamKey(),
                clientConnection.getOwnerName(),
                clientConnection.getOwnerUUID()
        );
    }

}
