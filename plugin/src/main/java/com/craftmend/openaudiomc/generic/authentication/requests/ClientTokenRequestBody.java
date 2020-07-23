package com.craftmend.openaudiomc.generic.authentication.requests;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ClientTokenRequestBody {

    private String playerName;
    private String playerUuid;
    private String session;
    private String publicKey;

}
