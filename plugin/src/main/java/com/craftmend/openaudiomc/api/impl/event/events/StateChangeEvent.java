package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import com.craftmend.openaudiomc.generic.state.interfaces.State;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * This even gets called whenever OpenAudioMc changes its internal networking state
 * or runs into an error that it couldn't recover from.
 *
 * This provides the new and old state, and isn't necessarily the result of any user interaction.
 *
 * This event might come in handy on development servers or during debugging, since states
 * carry small messages and state descriptors with them that can come in handy when working with
 * clients.
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EventSupportFlag(support = EventSupport.ONLY_PROXY_IF_AVAILABLE)
public class StateChangeEvent extends AudioEvent {

    private State oldState;
    private State newState;

}
