package com.craftmend.openaudiomc.generic.networking.rest.data;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import lombok.Getter;

@Getter
public class RestSuccessResponse<R extends AbstractRestResponse> {

    private String code;
    private R response;


}
