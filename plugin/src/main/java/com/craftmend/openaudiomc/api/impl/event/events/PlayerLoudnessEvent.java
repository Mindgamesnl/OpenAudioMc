package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.voicechat.events.VoiceStateChangeEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * This event triggers whenever a player with an active voicechat session changes their
 * tone or volume of voice. this can be used to differentiate between shouting, talking and whispering.
 */
@Getter
@Deprecated
@NoArgsConstructor
@AllArgsConstructor
public class PlayerLoudnessEvent extends AudioEvent {

    private ClientConnection client;
    private VoiceStateChangeEvent state;

    @Override
    public EventSupport getSupport() {
        return EventSupport.ONLY_PROXY_IF_AVAILABLE;
    }
}
