package com.craftmend.openaudiomc.services.networking.addapter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RestErrorResponse {

    private String message;
    private String code;

}
