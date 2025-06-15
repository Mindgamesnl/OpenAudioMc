package com.craftmend.openaudiomc.generic.rest.types;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;

public class RegistrationResponse extends AbstractRestResponse {
    private String publicKey;
    private String privateKey;

    public String getPublicKey() {
        return this.publicKey;
    }

    public String getPrivateKey() {
        return this.privateKey;
    }
}
