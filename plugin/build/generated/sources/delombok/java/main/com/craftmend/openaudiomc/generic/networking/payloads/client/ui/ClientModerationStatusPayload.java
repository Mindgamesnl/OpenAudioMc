package com.craftmend.openaudiomc.generic.networking.payloads.client.ui;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientModerationStatusPayload extends AbstractPacketPayload {
    private boolean isModerating;

    public ClientModerationStatusPayload() {
    }

    public ClientModerationStatusPayload(final boolean isModerating) {
        this.isModerating = isModerating;
    }
}
