package com.craftmend.openaudiomc.generic.authentication.requests;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;

public class SimpleTokenResponse extends AbstractRestResponse {
    private String token;
    // this value is only present in activate calls, where its true
    // if at least 1 preauth socket has been promoted to a real socket
    private Boolean sent;

    public String getToken() {
        return this.token;
    }

    public Boolean getSent() {
        return this.sent;
    }

    public SimpleTokenResponse() {
    }
}
