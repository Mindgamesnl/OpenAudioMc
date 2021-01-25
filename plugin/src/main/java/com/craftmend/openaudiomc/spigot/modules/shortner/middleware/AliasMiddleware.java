package com.craftmend.openaudiomc.spigot.modules.shortner.middleware;

import com.craftmend.openaudiomc.generic.media.interfaces.ForcedUrlMutation;
import com.craftmend.openaudiomc.spigot.modules.shortner.AliasModule;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AliasMiddleware implements ForcedUrlMutation {

    private AliasModule aliasModule;

    @Override
    public String onRequest(String original) {
        String name = original.replace("a:", "");
        return aliasModule.translate(name);
    }

}
