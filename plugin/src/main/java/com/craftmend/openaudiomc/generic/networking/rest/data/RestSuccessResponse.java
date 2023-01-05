package com.craftmend.openaudiomc.generic.networking.rest.data;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import lombok.Getter;

@Getter
public class RestSuccessResponse<R extends AbstractRestResponse> {

    private String code;
    private R response;


}
