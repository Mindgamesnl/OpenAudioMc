package com.craftmend.openaudiomc.generic.authentication.requests;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ClientTokenRequestBody {

    public static ClientTokenRequestBody withActivateToken(String token) {
        return new ClientTokenRequestBody(
                "ACCOUNT",
                null,
                null,
                null,
                null,
                null,
                token
        );
    }

    private String scope = "ACCOUNT";
    private String playerName;
    private String playerUuid;
    private String session;
    private String publicKey;

    // both of these are technically optional, but they are required for the bedrock authentication
    private String playerIp;
    private String enteredCode;

}
