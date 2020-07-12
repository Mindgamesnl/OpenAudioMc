package com.craftmend.openaudiomc.spigot.modules.show.networking.rest;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ShowUploadResponse extends AbstractRestResponse {

    private String message;
    private String redirectUrl;

}
