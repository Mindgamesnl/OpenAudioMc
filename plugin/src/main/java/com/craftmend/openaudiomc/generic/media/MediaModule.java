package com.craftmend.openaudiomc.spigot.modules.media;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.media.interfaces.UrlMutation;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
public class MediaModule {

    private Map<String, List<UrlMutation>> urlMutations = new HashMap<>();

    public void registerMutation(String host, UrlMutation urlMutation) {
        urlMutations.computeIfAbsent(host, k -> new ArrayList<>());
        urlMutations.get(host).add(urlMutation);
    }

    /**
     * Process the url trough the mutation api
     *
     * @param original the original url
     * @return the altered url
     */
    public String process(String original) {
        for (String selector : urlMutations.keySet()) {
            if (original.startsWith(selector)) {
                for (UrlMutation urlMutation : urlMutations.get(selector)) {
                    original = urlMutation.onRequest(OpenAudioMcSpigot.getInstance(), original);
                }
            }
        }
        return original;
    }

}
