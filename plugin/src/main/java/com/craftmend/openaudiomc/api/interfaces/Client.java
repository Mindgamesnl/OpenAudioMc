package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.generic.hue.HueState;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.user.User;

public interface Client {

    /**
     * @return Whether the client is connected or not
     */
    boolean isConnected();

    /**
     * @return Gets the basic player wrapper, wraps Bungeecord and Spigot
     */
    User getUser();

    /**
     * Add a on connect handler, which fires when the client gets opened for the player
     *
     * @param runnable Handler
     */
    void onConnect(Runnable runnable);

    /**
     * send media to the client to play
     *
     * @param media media to be send
     */
    void sendMedia(Media media);

    /**
     * Add a on connect handler, which fires when the client gets closed for by player
     *
     * @param runnable Handler
     */
    void onDisconnect(Runnable runnable);

    /**
     * Get the client volume
     * return Last used client volume, or -1 if it's unknown
     */
    int getVolume();

    /**
     * Update a clients hue state.
     * @param state New state
     */
    void setHueState(HueState state);

    /**
     * @return true if the user has their hue lights connected
     */
    boolean hasPhilipsHue();

    /**
     * Whether the client has their microphone enabled
     * @return true if voice is enabled and microphone isn't muted
     */
    boolean isMicrophoneActive();

    /**
     * This completely prevents the client microphone from working (client side and in the sfu),
     * this can be used as a safe method to mute clients for moderation or other features.
     * @param disabled If the mic should be disabled
     */
    void forcefullyDisableMicrophone(boolean disabled);

}
