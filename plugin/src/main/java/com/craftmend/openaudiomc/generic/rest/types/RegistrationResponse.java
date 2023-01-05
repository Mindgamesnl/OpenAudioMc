package com.craftmend.openaudiomc.generic.rest.types;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import lombok.Getter;

@Getter
public class RegistrationResponse extends AbstractRestResponse {

    private String publicKey;
    private String privateKey;

}
