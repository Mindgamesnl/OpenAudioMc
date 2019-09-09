package com.craftmend.openaudiomc.generic.media.middleware;

import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;

public class SoundCloudMiddleware implements UrlMutation {

    @Override
    public String onRequest(String s) {
        return "https://api.openaudiomc.net/stream.php?u=" + s;
    }
}
