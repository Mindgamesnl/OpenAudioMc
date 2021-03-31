package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.enums.MediaError;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * This event resembles an internal error in the web client (like bad or failed HTTP media requests).
 * You can check the `mediaSource` for the specific URL that failed (after processing, so it could lead to our
 * media CDN instead of mapping 1-to-1 to an existing region)
 *
 * the MediaError field contains some extra context from the error.
 */
@AllArgsConstructor
public class ClientErrorEvent extends AudioEvent {

    @Getter
    private ClientConnection client;

    @Getter
    private MediaError mediaError;
    @Getter
    private String mediaSource;

}
