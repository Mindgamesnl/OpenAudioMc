package com.craftmend.openaudiomc.generic.authentication.requests;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SimpleTokenResponse extends AbstractRestResponse {

    private String token;

}
