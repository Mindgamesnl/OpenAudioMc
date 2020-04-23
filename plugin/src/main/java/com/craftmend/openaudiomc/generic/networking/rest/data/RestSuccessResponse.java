package com.craftmend.openaudiomc.generic.rest.data;

import com.craftmend.openaudiomc.generic.rest.interfaces.AbstractRestResponse;
import lombok.Getter;

@Getter
public class RestSuccessResponse<R extends AbstractRestResponse> {

    private String code;
    private R response;


}
