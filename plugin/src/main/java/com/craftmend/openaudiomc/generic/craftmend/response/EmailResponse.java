package com.craftmend.openaudiomc.generic.craftmend.response;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import lombok.Getter;

@Getter
public class EmailResponse extends AbstractRestResponse {

    private String email;

}
