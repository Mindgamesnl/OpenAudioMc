package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.ClientEvent;
import com.craftmend.openaudiomc.api.media.MediaError;

/**
 * This event is called whenever a media source fails to load or play for the web client
 */
public class MediaErrorEvent extends ClientEvent {

    private final String mediaSource;
    private final MediaError mediaError;

    /**
     * This event resembles an internal error in the web client (like bad or failed HTTP media requests).
     *
     * @param client the client that this event is about
     */
    public MediaErrorEvent(Client client, String mediaSource, MediaError mediaError) {
        super(client);
        this.mediaSource = mediaSource;
        this.mediaError = mediaError;
    }

    /**
     * Get the media source that failed
     *
     * @return the media source
     */
    public String getMediaSource() {
        return mediaSource;
    }

    /**
     * Get the media error
     *
     * @return the media error
     */
    public MediaError getMediaError() {
        return mediaError;
    }
}
