package com.craftmend.openaudiomc.generic.craftmend.response;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import lombok.Getter;

@Getter
public class VoiceSessionRequestResponse extends AbstractRestResponse {

    private String password;
    private String server;

}
