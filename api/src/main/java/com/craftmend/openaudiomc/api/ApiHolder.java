package com.craftmend.openaudiomc.api;

public class ApiHolder {

    static ClientApi clientApiInstance;
    static WorldApi worldApiInstance;
    static VoiceApi voiceApiInstance;
    static MediaApi mediaApiInstance;
    static EventApi eventApiInstance;

    public static void initiate(
            ClientApi clientApi,
            WorldApi worldApi,
            VoiceApi voiceApi,
            MediaApi mediaApi,
            EventApi eventApi
    ) {
        if (clientApiInstance != null) throw new IllegalStateException("Api already initiated");

        clientApiInstance = clientApi;
        worldApiInstance = worldApi;
        voiceApiInstance = voiceApi;
        mediaApiInstance = mediaApi;
        eventApiInstance = eventApi;
    }

}
