package com.craftmend.openaudiomc.api.clients;

import com.craftmend.openaudiomc.api.basic.Actor;
import com.craftmend.openaudiomc.api.media.Media;
import org.jetbrains.annotations.NotNull;

public interface Client {

    /*
     * A player session represents the state of an online player and its corresponding web client connection.
     * It's used to interact with the webclient, determine and change state and hook back into the platform specific user object.
     */

    /**
     * Get the actor of the underlying User (usually a player)
     * @return the actor
     */
    Actor getActor();

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
     * If this client currently has the web session open
     * @return if the client is connected
     */
    boolean isConnected();

    /**
     * If this session has an active voice chat instance
     * @return if the client is in a voice chat
     */
    boolean hasVoicechatEnabled();

    /**
     * If this the actor's microphone is muted, false if the actor is not in a voice chat
     * @return if the microphone is muted
     */
    boolean isMicrophoneMuted();

    /**
     * Get the volume of the client (media volume, 0-100, -1 if unknown or not applicable)
     * @return the volume
     */
    int getVolume();

    /**
     * If the actor is currently in moderation mode
     * @return if the actor is moderating
     */
    boolean isModerating();

    /**
     * Play a media for this client
     * @param media the media to play
     */
    void playMedia(@NotNull Media media);
}
