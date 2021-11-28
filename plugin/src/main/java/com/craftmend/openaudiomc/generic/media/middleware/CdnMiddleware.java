package com.craftmend.openaudiomc.generic.media.middleware;

import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.cdn.CdnService;
import com.craftmend.openaudiomc.generic.media.interfaces.ForcedUrlMutation;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CdnMiddleware implements ForcedUrlMutation {

    private AuthenticationService authenticationService;

    @Override
    public String onRequest(String original) {
        String name = original.replace("local:", "");
        String publicKey = authenticationService.getServerKeySet().getPublicKey().getValue();
        return "https://media.openaudiomc.net/direct/" + publicKey + "?fileName=" + name;
    }

}
