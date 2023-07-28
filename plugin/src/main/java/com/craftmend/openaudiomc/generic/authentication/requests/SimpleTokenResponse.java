package com.craftmend.openaudiomc.generic.authentication.requests;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SimpleTokenResponse extends AbstractRestResponse {

    private String token;

    // this value is only present in activate calls, where its true
    // if at least 1 preauth socket has been promoted to a real socket
    private Boolean sent;

}
