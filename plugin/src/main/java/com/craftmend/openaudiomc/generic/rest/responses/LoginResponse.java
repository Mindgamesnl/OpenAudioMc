package com.craftmend.openaudiomc.generic.networking.rest.responses;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import com.craftmend.openaudiomc.generic.networking.rest.responses.login.PlusAccount;
import com.craftmend.openaudiomc.generic.networking.rest.responses.login.PlusServer;
import lombok.Getter;

@Getter
public class LoginResponse extends AbstractRestResponse {

    private PlusAccount account;
    private PlusServer assignedOpenAudioServer;

}
