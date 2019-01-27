package com.craftmend.openaudiomc.modules.media.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;

public interface UrlMutation {

    String onRequest(OpenAudioMc openAudioMc, String original);

}
