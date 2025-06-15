package com.craftmend.openaudiomc.generic.rest.types;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;

public class ClaimCodeResponse extends AbstractRestResponse {
    private String claimUrl;

    public String getClaimUrl() {
        return this.claimUrl;
    }
}
