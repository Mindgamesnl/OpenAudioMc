package com.craftmend.openaudiomc.api;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.api.media.UrlMutation;
import org.jetbrains.annotations.NotNull;

public interface MediaApi {

    /**
     * Create a new media instance with a source, and automatically translate the source
     * (if needed) and register a normalized time for the start instant.
     *
     * @param source the source of the media
     * @return a new media instance
     */
    @NotNull
    Media createMedia(@NotNull String source);

    /**
     * Translate server-sided aliases, playlists or other sources to a valid source.
     * This is automatically done by createMedia, but you might want to do this manually.
     *
     * @param source the source to translate
     * @return the translated source
     */
    @NotNull
    String translateSource(@NotNull String source);

    /**
     * URL mutations can be used to register custom server-side media hooks or source translators.
     * An example use case would be a custom media server aliased by hypixel:, which can be resolved
     * to https://hypixel.com/media/* by a mutation.
     *
     * @param mutation the mutation to register
     */
    void registerMutation(@NotNull UrlMutation mutation);

    /**
     * Get the current epoch time, but normalized to the start of the current media.
     * This timecodes is normalized based on heartbeats from an open audio server, to eliminate
     * timezone changes between this server and the web-client (because the player might be in a different timezone)
     *
     * @return the current epoch time, but normalized to the start of the current media
     */
    long getNormalizedCurrentEpoch();

    /**
     * Play a media for a client
     * @param client Target client
     * @param media Media instance
     */
    void playFor(@NotNull Media media, @NotNull Client... clients);

    /**
     * Stop all media (except regions and speakers) for a client
     * @param clients Target clients
     */
    void stopFor(@NotNull Client... clients);

    /**
     * Stop a specific media by ID for a client
     * @param id Media ID
     * @param clients Target clients
     */
    void stopFor(@NotNull String id, @NotNull Client... clients);

}
