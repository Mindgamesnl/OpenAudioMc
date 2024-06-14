package com.craftmend.openaudiomc.api;

import com.craftmend.openaudiomc.api.channels.VoiceChannel;
import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.voice.CustomPlayerFilter;
import com.craftmend.openaudiomc.api.voice.DisplayOverride;
import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

/**
 * The VoiceApi contains registry, as well as control endpoints for voice-chat related features.
 * This implementation is only available on the Spigot instance, even if the plugin is running in a BungeeCord/Velocity or Vistas network.
 * Accessing this API on a non-spigot instance will result in undefined behavior or runtime exceptions.
 */
public interface VoiceApi {

    /**
     * Get the voice api instance, or null if the plugin is not loaded yet
     *
     * @return instance
     */
    static VoiceApi getInstance() {
        if (ApiHolder.voiceApiInstance == null) {
            throw new IllegalStateException("OpenAudioMc has not been initialized yet");
        }
        return ApiHolder.voiceApiInstance;
    }

    /**
     * Register a client as a voice-chat peer
     *
     * @param haystack The client that will be the host
     * @param needle   The client that will be the peer
     * @return true if the client was registered, false if the client was already registered
     */
    boolean hasPeer(Client haystack, Client needle);

    /**
     * Register a client as a voice-chat peer
     *
     * @param haystack The client that will be the host
     * @param needle   The client that will be the peer
     * @return true if the client was registered, false if the client was already registered
     */
    boolean hasPeer(Client haystack, UUID needle);

    /**
     * Push new options for a peer, changing how its rendered in the client
     *
     * @param client       The web client that should receive this update
     * @param peerToUpdate The peer that should be updated
     * @param options      The new options
     */
    void updatePeerOptions(Client client, Client peerToUpdate, VoicePeerOptions options);

    /**
     * Add a peer (partner) to someone's voice chat.
     * This would let the client hear the peerToAdd as a global voice (without spatial audio/distance) until it's removed.
     *
     * @param client    The web client that should receive this update
     * @param peerToAdd The peer that should be added
     * @param visible   Whether the peer should be visible in the client
     * @param mutual    Whether the peer should also hear the client (repeat the call for mutual)
     */
    void addStaticPeer(Client client, Client peerToAdd, boolean visible, boolean mutual);

    /**
     * Add a peer (partner) to someone's voice chat.
     * This would let the client hear the peerToAdd as a global voice (without spatial audio/distance) until it's removed.
     *
     * @param client          The web client that should receive this update
     * @param peerToAdd       The peer that should be added
     * @param visible         Whether the peer should be visible in the client
     * @param mutual          Whether the peer should also hear the client (repeat the call for mutual)
     * @param displayOverride A display override, which can be used to change the display name and skin of a player in the voice chat system.
     * @since 6.10.2
     */
    void addStaticPeer(Client client, Client peerToAdd, boolean visible, boolean mutual, DisplayOverride displayOverride);

    /**
     * Remove a global peer from someone's voice chat.
     * This would remove a static peer if they have been added through addStaticPeer, but not
     * if they have been added through the regular voice-chat system.
     *
     * @param client       The web client that should receive this update
     * @param peerToRemove The peer that should be removed
     * @param mutual       Whether the peer should also stop hearing the client (repeat the call for mutual)
     */
    void removeStaticPeer(Client client, Client peerToRemove, boolean mutual);

    /**
     * Adds a {@link CustomPlayerFilter} to the list of functions to filter out players in {@code com.craftmend.openaudiomc.spigot.modules.voicechat.filters.PeerFilter#wrap(Stream, Player)} (which lives in the plugin, not api).
     * These functions are called in {@code com.craftmend.openaudiomc.spigot.modules.voicechat.filters.PeerFilter#wrap(Stream, Player)} to allow for plugins to add custom sorting for
     * players. An example being staff members shouldn't be heard by other players so adding a custom function implementation via
     * {@link #addFilterFunction(CustomPlayerFilter)} allows for such functionality to exist.
     * <br />
     * Please read the documentation in the {@link CustomPlayerFilter} before planning your implementation,
     * because you are probably better off using the event system for most use-cases.
     *
     * @param customPlayerFilter The {@link CustomPlayerFilter} to be added to the list of functions
     * @author DiamondDagger590
     */
    void addFilterFunction(CustomPlayerFilter customPlayerFilter);

    /**
     * Returns a copy of the internal {@link List} of {@link CustomPlayerFilter}s. This means
     * modifications done to the {@link List} returned by this method will not result
     * in changes in the actual list.
     * <br />
     * These functions will be called in whatever order they are stored in.
     * <br />
     * These functions are called in {@code com.craftmend.openaudiomc.spigot.modules.voicechat.filters.PeerFilter#wrap(Stream, Player)} to allow for plugins to add custom sorting for
     * players. An example being staff members shouldn't be heard by other players so adding a custom function implementation via
     * {@link #addFilterFunction(CustomPlayerFilter)} allows for such functionality to exist.
     *
     * @return A copied {@link List} of {@link CustomPlayerFilter}s
     * @author DiamondDagger590
     */
    List<CustomPlayerFilter> getCustomPlayerFilters();

    /**
     * Get a list of all registered channels
     * @return a list of all registered channels
     * @since 6.10.1
     */
    Collection<VoiceChannel> getChannels();

    /**
     * Get a channel by its name
     * @param name the name of the channel
     * @return the channel, or null if the channel does not exist
     * @since 6.10.1
     */
    @Nullable
    VoiceChannel getChannel(String name);

    /**
     * Create a new channel
     * @param name the name of the channel
     * @param creator the creator of the channel
     * @param requiresPermission if the channel requires permission to join
     * @param requiredPermission the permission required to join the channel
     * @return the created channel
     * @since 6.10.1
     */
    VoiceChannel createChannel(String name, Client creator, boolean requiresPermission, @Nullable String requiredPermission);

    /**
     * Delete a channel
     * @param channel the channel to delete
     * @since 6.10.1
     */
    void deleteChannel(VoiceChannel channel);

    /**
     * Check if a channel name is valid
     * @param s the name to check
     * @return true if the name is valid
     * @since 6.10.1
     */
    boolean isChannelNameValid(String s);


}
