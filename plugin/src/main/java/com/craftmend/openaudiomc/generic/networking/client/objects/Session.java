package com.craftmend.openaudiomc.generic.networking.client.objects;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Session {

    private ClientConnection client;
    private String key;
    private String token;

    /**
     * Refresh the session
     *
     * This makes the current token invalid and generates a new one.
     * Refreshing a session will also generate a new Session object, making the current one
     * useless
     */
    public void regenerate() {
        client.refreshSession();
    }

}
