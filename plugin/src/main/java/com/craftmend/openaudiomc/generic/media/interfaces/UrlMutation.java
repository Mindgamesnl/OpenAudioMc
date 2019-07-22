package com.craftmend.openaudiomc.spigot.modules.media.interfaces;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;

public interface UrlMutation {

    /**
     * @param openAudioMcSpigot Instance of the plugin
     * @param original the original source as entered in the command
     * @return the new url that will be send to the client
     */
    String onRequest(OpenAudioMcSpigot openAudioMcSpigot, String original);

}
