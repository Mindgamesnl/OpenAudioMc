package com.craftmend.openaudiomc.api;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.api.media.UrlMutation;
import org.jetbrains.annotations.NotNull;


/**
 * The MediaApi is a collection of methods to interact with media, and get information about them
 */
public interface MediaApi {

    /**
     * Get an instance of the media api. May be null if the plugin is not loaded yet
     * @return instance
     */
    static MediaApi getInstance() {
        if (ApiHolder.mediaApiInstance == null) {
            throw new IllegalStateException("OpenAudioMc has not been initialized yet");
        }
        return ApiHolder.mediaApiInstance;
    }

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
     * Force a client to preload a media source, so it's ready to play when needed.
     * This will force the client to download the entire file and cache it. Once a media is played
     * (through any method) it will look in the cache and take it from there if it's available.
     * This method is useful for preloading media sources that are not played often, but should be
     * ready to play at any time (like a sound effects, shows, etc)
     *
     * @param client the client to preload the media for
     * @param mediaSource the media source to preload
     */
    void preloadMediaSource(Client client, String mediaSource);

    /**
     * Force a client to preload a media, so it's ready to play when needed.
     * This will force the client to download the entire file and cache it. Once a media is played
     * (through any method) it will look in the cache and take it from there if it's available.
     * This method is useful for preloading media sources that are not played often, but should be
     * ready to play at any time (like a sound effects, shows, etc)
     *
     * @param client the client to preload the media for
     * @param media the media to preload
     */
    void preloadMedia(Client client, Media media);

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
     * @param prefix the prefix to register the mutation for,
     *               the mutation will only be called for media sources starting with this prefix
     * @param mutation the mutation to register
     */
    void registerMutation(@NotNull String prefix, @NotNull UrlMutation mutation);

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
     * @param clients Target clients
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
