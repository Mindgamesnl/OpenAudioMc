package com.craftmend.openaudiomc.generic.authentication.requests;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ClientTokenResponseBody extends AbstractRestResponse {

    private String token;

}
