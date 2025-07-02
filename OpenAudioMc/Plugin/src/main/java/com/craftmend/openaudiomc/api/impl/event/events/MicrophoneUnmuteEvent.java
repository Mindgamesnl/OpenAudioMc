package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.ClientEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * This event gets called whenever a player unmutes their microphone _or_ whenever a player
 * activates their microphone for the first time. (so completing the setup and loading voicechat
 * after connecting to the webclient will also trigger this event)
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EventSupportFlag(support = EventSupport.EVERYWHERE)
@Deprecated
public class MicrophoneUnmuteEvent extends AudioEvent implements ClientEvent {

    private ClientConnection client;

}
