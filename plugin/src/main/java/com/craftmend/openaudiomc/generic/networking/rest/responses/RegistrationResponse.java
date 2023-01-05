package com.craftmend.openaudiomc.generic.networking.rest.responses;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import lombok.Getter;

@Getter
public class RegistrationResponse extends AbstractRestResponse {

    private String privateKey;
    private String publicKey;

}
