package com.craftmend.openaudiomc.api;

/**
 * Internal class used to initialize the API once based on services from the plugin.
 * Calling any of these methods will throw an exception if the API is already initiated.
 */
public class ApiHolder {

    static ClientApi clientApiInstance;
    static WorldApi worldApiInstance;
    static VoiceApi voiceApiInstance;
    static MediaApi mediaApiInstance;
    static EventApi eventApiInstance;

    public static void initiate(
            ClientApi clientApi
    ) {
        if (clientApiInstance != null) throw new IllegalStateException("Api already initiated");

        clientApiInstance = clientApi;
    }

    public static void initiate(
            WorldApi worldApi
    ) {
        if (worldApiInstance != null) throw new IllegalStateException("Api already initiated");

        worldApiInstance = worldApi;
    }

    public static void initiate(
            VoiceApi voiceApi
    ) {
        if (voiceApiInstance != null) throw new IllegalStateException("Api already initiated");

        voiceApiInstance = voiceApi;
    }

    public static void initiate(
            MediaApi mediaApi
    ) {
        if (mediaApiInstance != null) throw new IllegalStateException("Api already initiated");

        mediaApiInstance = mediaApi;
    }

    public static void initiate(
            EventApi eventApi
    ) {
        if (eventApiInstance != null) throw new IllegalStateException("Api already initiated");

        eventApiInstance = eventApi;
    }

}
