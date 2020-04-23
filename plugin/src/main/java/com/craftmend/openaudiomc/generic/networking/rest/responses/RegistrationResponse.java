package com.craftmend.openaudiomc.generic.rest.responses;

import com.craftmend.openaudiomc.generic.rest.interfaces.AbstractRestResponse;
import lombok.Getter;

@Getter
public class RegistrationResponse extends AbstractRestResponse {

    private String privateKey;
    private String publicKey;

}
