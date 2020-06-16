package com.craftmend.openaudiomc.generic.networking.rest.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RestErrorResponse {

    private String message;
    private RestErrorType code;

}
