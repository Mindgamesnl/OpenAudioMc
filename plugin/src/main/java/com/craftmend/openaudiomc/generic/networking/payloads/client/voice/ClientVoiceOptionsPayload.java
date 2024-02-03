package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientVoiceOptionsPayload extends AbstractPacketPayload {

    private String targetPeerKey;
    private VoicePeerOptions options;

}
