package com.craftmend.openaudiomc.generic.authentication.objects;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class RequestResponse {

    /**
     * response of a http request, and its possible values
     */
    private boolean success;
    private UUID publicKey;
    private UUID privateKey;

}
