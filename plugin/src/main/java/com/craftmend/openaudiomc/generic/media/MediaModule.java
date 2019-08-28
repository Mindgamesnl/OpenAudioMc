package com.craftmend.openaudiomc.generic.media;

import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;
import com.craftmend.openaudiomc.generic.media.middleware.GoogleDriveMiddleware;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MediaModule {

    private Map<String, List<UrlMutation>> urlMutations = new HashMap<>();

    public MediaModule() {
        // register default mutations
        registerMutation("https://drive.google.com/", new GoogleDriveMiddleware());
    }

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
                    original = urlMutation.onRequest(original);
                }
            }
        }
        return original;
    }

}
