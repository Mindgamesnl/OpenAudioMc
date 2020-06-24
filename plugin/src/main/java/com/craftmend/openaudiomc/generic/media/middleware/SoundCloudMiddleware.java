package com.craftmend.openaudiomc.generic.media.middleware;

import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;

public class SoundCloudMiddleware implements UrlMutation {

    @Override
    public String onRequest(String s) {
        return "https://weathered-dust-0281.craftmend.workers.dev/?u=" + s;
    }
}
