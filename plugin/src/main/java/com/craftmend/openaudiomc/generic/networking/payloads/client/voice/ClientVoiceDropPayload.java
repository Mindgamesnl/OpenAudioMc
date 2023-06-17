package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.Data;

@Data
public class ClientVoiceDropPayload extends AbstractPacketPayload {

    private boolean dropAll = false;
    private String[] keysToDrop;

    private ClientVoiceDropPayload(boolean dropAll) {
        this.dropAll = dropAll;
    }

    public ClientVoiceDropPayload(String[] keysToDrop) {
        this.keysToDrop = keysToDrop;
    }

    public static ClientVoiceDropPayload dropAll() {
        return new ClientVoiceDropPayload(true);
    }


}
