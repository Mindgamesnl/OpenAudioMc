package com.craftmend.openaudiomc.generic.authentication.requests;

public class ClientTokenRequestBody {
    public static ClientTokenRequestBody withActivateToken(String token) {
        return new ClientTokenRequestBody("ACCOUNT", null, null, null, null, null, token);
    }

    private String scope = "ACCOUNT";
    private String playerName;
    private String playerUuid;
    private String session;
    private String publicKey;
    // both of these are technically optional, but they are required for the bedrock authentication
    private String playerIp;
    private String enteredCode;

    public ClientTokenRequestBody(final String scope, final String playerName, final String playerUuid, final String session, final String publicKey, final String playerIp, final String enteredCode) {
        this.scope = scope;
        this.playerName = playerName;
        this.playerUuid = playerUuid;
        this.session = session;
        this.publicKey = publicKey;
        this.playerIp = playerIp;
        this.enteredCode = enteredCode;
    }
}
