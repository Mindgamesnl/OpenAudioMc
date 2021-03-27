package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.events.enums.VoiceEventCause;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlayerLeaveVoiceProximityEvent extends AudioEvent {

    private ClientConnection speaker;
    private ClientConnection listener;
    private VoiceEventCause cause;

}
