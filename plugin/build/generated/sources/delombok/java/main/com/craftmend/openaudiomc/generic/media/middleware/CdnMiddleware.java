package com.craftmend.openaudiomc.generic.media.middleware;

import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.media.interfaces.ForcedUrlMutation;

public class CdnMiddleware implements ForcedUrlMutation {
    private AuthenticationService authenticationService;

    @Override
    public String onRequest(String original) {
        String name = original.replace("local:", "");
        String publicKey;
        if (authenticationService.getExplicitParentPublicKey() != null) {
            publicKey = authenticationService.getExplicitParentPublicKey().getValue();
        } else {
            publicKey = authenticationService.getServerKeySet().getPublicKey().getValue();
        }
        return "https://media.openaudiomc.net/direct/" + publicKey + "?fileName=" + name;
    }

    public CdnMiddleware(final AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }
}
