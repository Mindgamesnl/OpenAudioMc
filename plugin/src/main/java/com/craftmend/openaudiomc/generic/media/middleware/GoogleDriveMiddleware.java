package com.craftmend.openaudiomc.generic.media.middleware;

import com.craftmend.openaudiomc.generic.media.interfaces.UrlMutation;

public class GoogleDriveMiddleware implements UrlMutation {

    @Override
    public String onRequest(String original) {
        // check if it's a valid google drive link with 6 /'s
        String[] parts = original.split("/");
        if (parts.length != 7) return original;
        return "http://docs.google.com/uc?export=open&id=" + parts[5];
    }

}
