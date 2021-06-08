package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientVoiceBlurUiPayload extends AbstractPacketPayload {

    private boolean blurred;

}
