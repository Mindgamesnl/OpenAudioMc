package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientVoiceChatUnlockPayload extends AbstractPacketPayload {

    private String streamKey;
    private String streamServer;
    private int radius;

}
