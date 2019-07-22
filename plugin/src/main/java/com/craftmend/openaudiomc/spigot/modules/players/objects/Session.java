package com.craftmend.openaudiomc.spigot.modules.players.objects;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Session {

    private WebConnection webConnection;
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
        webConnection.refreshSession();
    }

}
