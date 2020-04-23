package com.craftmend.openaudiomc.generic.rest.responses;

import com.craftmend.openaudiomc.generic.rest.interfaces.AbstractRestResponse;
import com.craftmend.openaudiomc.generic.rest.responses.login.PlusAccount;
import com.craftmend.openaudiomc.generic.rest.responses.login.PlusServer;
import lombok.Getter;

@Getter
public class LoginResponse extends AbstractRestResponse {

    private PlusAccount account;
    private PlusServer assignedOpenAudioServer;

}
