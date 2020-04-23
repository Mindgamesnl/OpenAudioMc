package com.craftmend.openaudiomc.generic.rest.responses.login;

import lombok.Data;

import java.util.UUID;

@Data
public class PlusAccount {

    private UUID privateKey;
    private UUID publicKey;
    private UUID currentRelay;

}
