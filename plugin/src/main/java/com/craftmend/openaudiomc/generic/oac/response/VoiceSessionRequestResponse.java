package com.craftmend.openaudiomc.generic.oac.response;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import lombok.Getter;

@Getter
public class VoiceSessionRequestResponse extends AbstractRestResponse {

    private String password;
    private String server;

}
