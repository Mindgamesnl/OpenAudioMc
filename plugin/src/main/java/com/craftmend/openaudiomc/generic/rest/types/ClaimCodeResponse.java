package com.craftmend.openaudiomc.generic.rest.types;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import lombok.Getter;

@Getter
public class ClaimCodeResponse extends AbstractRestResponse {

    private String claimUrl;

}
