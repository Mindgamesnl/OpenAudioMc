package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.basic.Actor;
import com.craftmend.openaudiomc.api.events.CancellableEvent;
import lombok.Getter;
import lombok.Setter;

@Getter
/**
 * This event is called before a client session is authenticated.
 * Cancelling this event will prevent the client from being authenticated and reload the web page.
 * Keep in mind that this event is run from the socket thread, and is blocking other clients from connecting.
 */
public class ClientAuthenticationEvent extends CancellableEvent {

    private Actor actor;
    private String token;

    /**
     * This event is called when a client is attempting to authenticate
     *
     * @param actor The actor that is trying to authenticate
     * @param token The token that is being used
     */
    public ClientAuthenticationEvent(Actor actor, String token) {
        this.actor = actor;
        this.token = token;
    }
}
