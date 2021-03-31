package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import lombok.Getter;
import lombok.Setter;

/**
 * This cancellable event gets fired after the {@link ClientConnectEvent} when voicechat is enabled for this server.
 * Cancelling this events will prevent the voicechat setup modal from showing up for this particular user,
 * which could be used for moderation purposes or to lock people out of voicechat.
 */
public class ClientRequestVoiceEvent extends AudioEvent {

    @Setter
    @Getter
    private boolean canceled = false;
    @Getter
    private ClientConnection requester;

    public ClientRequestVoiceEvent(ClientConnection clientConnection) {
        this.requester = clientConnection;
    }
}
