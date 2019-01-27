package com.craftmend.openaudiomc.modules.media;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.media.interfaces.UrlMutation;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@NoArgsConstructor
public class MediaModule {

    private Map<String, UrlMutation> urlMutations = new HashMap<>();

    public void registerMutation(String host, UrlMutation urlMutation) {
        urlMutations.put(host, urlMutation);
    }

    public String process(String original) {
        for (String selector : urlMutations.keySet()) {
            if (original.startsWith(selector)) {
                return urlMutations.get(selector).onRequest(OpenAudioMc.getInstance(), original);
            }
        }
        return original;
    }

}
