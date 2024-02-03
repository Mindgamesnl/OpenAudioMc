package com.craftmend.openaudiomc.generic.media;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.media.middleware.CdnMiddleware;
import com.craftmend.openaudiomc.generic.media.interfaces.ForcedUrlMutation;
import com.craftmend.openaudiomc.api.media.UrlMutation;
import com.craftmend.openaudiomc.generic.media.middleware.DropBoxMiddleware;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
public class MediaService extends Service {

    private final Map<String, List<UrlMutation>> urlMutations = new HashMap<>();
    @Getter private final List<Runnable> resetTriggers = new ArrayList<>();

    @Inject
    private AuthenticationService authenticationService;

    @Override
    public void onEnable() {
        // register default mutations
        registerMutation("https://www.dropbox.com", new DropBoxMiddleware());
        OpenAudioMc.getService(MediaService.class).registerMutation("local:", new CdnMiddleware(authenticationService));
        // note that google drive, soundcloud, ssl-proxy and youtube are handled client side
    }

    public void registerMutation(String host, UrlMutation urlMutation) {
        List<UrlMutation> list = urlMutations.getOrDefault(host, new ArrayList<>());
        list.add(urlMutation);
        urlMutations.put(host, list);
        resetTriggers.forEach(Runnable::run);
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
                    if (urlMutation instanceof ForcedUrlMutation) {
                        original = urlMutation.onRequest(original);
                    }
                }
            }
        }

        for (String selector : urlMutations.keySet()) {
            if (original.startsWith(selector)) {
                for (UrlMutation urlMutation : urlMutations.get(selector)) {
                    if (!(urlMutation instanceof ForcedUrlMutation))
                    original = urlMutation.onRequest(original);
                }
            }
        }

        return original;
    }

}
