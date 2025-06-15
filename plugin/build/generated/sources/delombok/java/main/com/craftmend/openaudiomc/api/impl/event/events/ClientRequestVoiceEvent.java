package com.craftmend.openaudiomc.api.impl.event.events;

import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;

/**
 * This cancellable event gets fired after the {@link ClientConnectEvent} when voicechat is enabled for this server.
 * Cancelling this events will prevent the voicechat setup modal from showing up for this particular user,
 * which could be used for moderation purposes or to lock people out of voicechat.
 */
@EventSupportFlag(support = EventSupport.ONLY_PROXY_IF_AVAILABLE)
@Deprecated
public class ClientRequestVoiceEvent extends AudioEvent {
    private boolean canceled = false;
    private ClientConnection requester;

    public ClientRequestVoiceEvent(ClientConnection clientConnection) {
        this.requester = clientConnection;
    }

    public ClientRequestVoiceEvent() {
    }

    public void setCanceled(final boolean canceled) {
        this.canceled = canceled;
    }

    public boolean isCanceled() {
        return this.canceled;
    }

    public ClientConnection getRequester() {
        return this.requester;
    }
}
