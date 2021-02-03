package com.craftmend.openaudiomc.generic.craftmend.response;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClientSettingsResponse extends AbstractRestResponse {

    private Boolean banned = false;
    private Boolean claimed = false;
    private String domain = null;
    private String startSound = null;
    private String backgroundImage = null;
    private String clientWelcomeMessage = null;
    private String clientErrorMessage = null;
    private String title = null;


}
