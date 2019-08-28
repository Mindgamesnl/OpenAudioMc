package com.craftmend.openaudiomc.generic.media.middleware;

import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;

public class DropBoxMiddleware implements UrlMutation {

    @Override
    public String onRequest(String original) {
        if (original.contains("?dl=0")) {
            return original.replace("?dl=0", "?dl=1");
        } else {
            return original += "?dl=1";
        }
    }

}
