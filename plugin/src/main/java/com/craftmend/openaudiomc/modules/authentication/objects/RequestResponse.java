package com.craftmend.openaudiomc.modules.authentication.objects;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class RequestResponse {

    private Boolean success;
    private UUID publicKey;
    private UUID privateKey;

}
