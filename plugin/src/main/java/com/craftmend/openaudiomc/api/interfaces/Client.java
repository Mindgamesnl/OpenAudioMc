package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.Publisher;

import java.util.Map;

public interface Client {

    /**
     * @return Whether the client is connected or not
     */
    boolean isConnected();

    /**
     * @return Gets the basic player wrapper, wraps Bungeecord and Spigot
     */
    PlayerContainer getPlayer();

    /**
     * @return Get the publisher, used to send session URL's to the client
     */
    Publisher getPublisher();

    /**
     * @return Whether the client has smart-lights (like Philips Hue) linked
     */
    boolean hasSmartLights();

    /**
     * @return Key value instance used by addons to store connection metadata
     */
    Map<String, String> getKeyValue();

    /**
     * Add a on connect handler, which fires when the client gets opened for the player
     *
     * @param runnable Handler
     */
    void onConnect(Runnable runnable);

    /**
     * Add a on connect handler, which fires when the client gets closed for by player
     *
     * @param runnable Handler
     */
    void onDisconnect(Runnable runnable);

    /**
     * Get the client volume
     * @return Last used client volume, or -1 if it's unknown
     */
    int getVolume();

}
