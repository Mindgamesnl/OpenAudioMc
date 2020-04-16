package com.craftmend.openaudiomc.generic.plus.updates;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateLoginPayload {

    private String playerName;
    private String privateKey;

}
