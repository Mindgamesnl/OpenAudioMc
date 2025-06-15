package com.craftmend.openaudiomc.generic.networking.payloads.in;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.Data;
import java.util.UUID;

public class ClientEnabledHuePayload extends AbstractPacketPayload {
    private UUID client;

    public ClientEnabledHuePayload(final UUID client) {
        this.client = client;
    }

    public ClientEnabledHuePayload() {
    }
}
