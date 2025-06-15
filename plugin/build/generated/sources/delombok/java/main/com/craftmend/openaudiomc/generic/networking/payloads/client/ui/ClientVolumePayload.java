package com.craftmend.openaudiomc.generic.networking.payloads.client.ui;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientVolumePayload extends AbstractPacketPayload {
    private int volume;

    public ClientVolumePayload() {
    }

    public ClientVolumePayload(final int volume) {
        this.volume = volume;
    }
}
