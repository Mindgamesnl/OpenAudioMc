package com.craftmend.openaudiomc.generic.plus.response;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import lombok.Getter;

@Getter
public class PlusLoginToken extends AbstractRestResponse {

    private String token;

}
