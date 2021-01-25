package com.craftmend.openaudiomc.generic.plus.response;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClientSettingsResponse extends AbstractRestResponse {

    private String domain = null;
    private String startSound = null;
    private String backgroundImage = null;
    private String clientWelcomeMessage = null;
    private String clientErrorMessage = null;
    private String title = null;
    private Boolean playerSync = null;


}
