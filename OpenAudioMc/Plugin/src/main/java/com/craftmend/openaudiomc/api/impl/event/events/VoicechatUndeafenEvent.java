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
 * This is a simple event that gets called whenever a player explicitly mutes their microphone
 * (through a command or the web client)
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EventSupportFlag(support = EventSupport.EVERYWHERE)
@Deprecated
public class VoicechatUndeafenEvent extends AudioEvent implements ClientEvent {

    private ClientConnection client;

}
