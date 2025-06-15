package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.api.media.MediaError;

/**
 * This event resembles an internal error in the web client (like bad or failed HTTP media requests).
 * You can check the `mediaSource` for the specific URL that failed (after processing, so it could lead to our
 * media CDN instead of mapping 1-to-1 to an existing region)
 *
 * the MediaError field contains some extra context from the error.
 */
@EventSupportFlag(support = EventSupport.ONLY_PROXY_IF_AVAILABLE)
@Deprecated
public class ClientErrorEvent extends AudioEvent {
    private ClientConnection client;
    private MediaError mediaError;
    private String mediaSource;

    public ClientErrorEvent() {
    }

    public ClientErrorEvent(final ClientConnection client, final MediaError mediaError, final String mediaSource) {
        this.client = client;
        this.mediaError = mediaError;
        this.mediaSource = mediaSource;
    }

    public ClientConnection getClient() {
        return this.client;
    }

    public MediaError getMediaError() {
        return this.mediaError;
    }

    public String getMediaSource() {
        return this.mediaSource;
    }
}
