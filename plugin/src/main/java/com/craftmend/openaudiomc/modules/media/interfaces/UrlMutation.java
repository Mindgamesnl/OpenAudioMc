package com.craftmend.openaudiomc.modules.media.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;

public interface UrlMutation {

    /**
     * @param openAudioMc Instance of the plugin
     * @param original the original source as entered in the command
     * @return the new url that will be send to the client
     */
    String onRequest(OpenAudioMc openAudioMc, String original);

}
