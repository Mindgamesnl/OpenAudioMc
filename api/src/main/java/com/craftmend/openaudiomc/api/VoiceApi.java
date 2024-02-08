package com.craftmend.openaudiomc.api;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;

import java.util.UUID;

public interface VoiceApi {

    /**
     * Get the voice api instance, or null if the plugin is not loaded yet
     * @return instance
     */
    static VoiceApi getInstance() {
        if (ApiHolder.voiceApiInstance == null) {
            throw new IllegalStateException("OpenAudioMc has not been initialized yet");
        }
        return ApiHolder.voiceApiInstance;
    }

    /*
     * The VoiceApi contains registry, as well as control endpoints for voice-chat related features.
     * This implementation is only available on the Spigot instance, even if the plugin is running in a BungeeCord/Velocity or Vistas network.
     * Accessing this API on a non-spigot instance will result in undefined behavior or runtime exceptions.
     */

    /**
     * Register a client as a voice-chat peer
     * @param haystack The client that will be the host
     * @param needle The client that will be the peer
     * @return true if the client was registered, false if the client was already registered
     */
    boolean hasPeer(Client haystack, Client needle);

    /**
     * Register a client as a voice-chat peer
     * @param haystack The client that will be the host
     * @param needle The client that will be the peer
     * @return true if the client was registered, false if the client was already registered
     */
    boolean hasPeer(Client haystack, UUID needle);

    /**
     * Push new options for a peer, changing how its rendered in the client
     * @param client The web client that should receive this update
     * @param peerToUpdate The peer that should be updated
     * @param options The new options
     */
    void updatePeerOptions(Client client, Client peerToUpdate, VoicePeerOptions options);

    /**
     * Add a peer (partner) to someone's voice chat.
     * This would let the client hear the peerToAdd as a global voice (without spatial audio/distance) until it's removed.
     * @param client The web client that should receive this update
     * @param peerToAdd The peer that should be added
     * @param visible Whether the peer should be visible in the client
     * @param mutual Whether the peer should also hear the client (repeat the call for mutual)
     */
    void addStaticPeer(Client client, Client peerToAdd, boolean visible, boolean mutual);

    /**
     * Remove a global peer from someone's voice chat.
     * This would remove a static peer if they have been added through addStaticPeer, but not
     * if they have been added through the regular voice-chat system.
     * @param client The web client that should receive this update
     * @param peerToRemove The peer that should be removed
     * @param mutual Whether the peer should also stop hearing the client (repeat the call for mutual)
     */
    void removeStaticPeer(Client client, Client peerToRemove, boolean mutual);


}
