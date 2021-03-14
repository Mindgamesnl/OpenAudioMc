package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.enums.MediaError;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class ClientErrorEvent extends AudioEvent {

    @Getter
    private ClientConnection client;

    @Getter
    private MediaError mediaError;
    @Getter
    private String mediaSource;

}
