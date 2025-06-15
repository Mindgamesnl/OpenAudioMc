package com.craftmend.openaudiomc.spigot.modules.shortner.middleware;

import com.craftmend.openaudiomc.generic.media.interfaces.ForcedUrlMutation;
import com.craftmend.openaudiomc.spigot.modules.shortner.AliasService;

public class AliasMiddleware implements ForcedUrlMutation {
    private AliasService aliasService;

    @Override
    public String onRequest(String original) {
        String name = original.replace("a:", "");
        return aliasService.translate(name);
    }

    public AliasMiddleware(final AliasService aliasService) {
        this.aliasService = aliasService;
    }
}
