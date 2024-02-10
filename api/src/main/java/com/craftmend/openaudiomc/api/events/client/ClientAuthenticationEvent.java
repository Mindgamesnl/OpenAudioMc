package com.craftmend.openaudiomc.api.events.client;

import com.craftmend.openaudiomc.api.basic.Actor;
import com.craftmend.openaudiomc.api.events.CancellableEvent;
import lombok.Getter;
import lombok.Setter;

@Getter
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
