package com.craftmend.openaudiomc.generic.oac.response;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;

public class VoiceSessionRequestResponse extends AbstractRestResponse {
    private String password;
    private String server;

    public String getPassword() {
        return this.password;
    }

    public String getServer() {
        return this.server;
    }
}
