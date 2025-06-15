package com.craftmend.openaudiomc.generic.networking.payloads.client.ui;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class NotificationPayload extends AbstractPacketPayload {
    private String title;
    private String message;

    public NotificationPayload() {
    }

    public NotificationPayload(final String title, final String message) {
        this.title = title;
        this.message = message;
    }
}
