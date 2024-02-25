package com.craftmend.openaudiomc.api.clients;

import com.craftmend.openaudiomc.api.basic.Actor;
import com.craftmend.openaudiomc.api.media.Media;
import org.jetbrains.annotations.NotNull;

/**
 * A player session represents the state of an online player and its corresponding web client connection.
 * It's used to interact with the webclient, determine and change state and hook back into the platform specific user object.
 */
public interface Client {

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

    /**
     * Forcefully remove a player from my proximity chat peers. This will cause the otherClient to trigger a new ClientPeerAddEvent
     * Useful for refreshing peers when someone changes game modes, for example.
     * This method will not do anything if this user isn't in voice chat, if they aren't a peer, or if the other client isn't in voice chat.
     * This action is **one-sided**. The other client will still be listening to this client.
     * @param otherClient the client to remove
     */
    void kickProximityPeer(@NotNull Client otherClient);

}
