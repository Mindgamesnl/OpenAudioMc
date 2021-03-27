package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * This is a simple event that gets called whenever a player explicitly mutes their microphone
 * (through a command or the web client)
 */
@Getter
@AllArgsConstructor
public class MicrophoneMuteEvent extends AudioEvent {

    private ClientConnection client;

}
