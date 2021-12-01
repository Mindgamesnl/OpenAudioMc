package com.craftmend.openaudiomc.generic.client.helpers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.client.session.ClientAuth;
import com.craftmend.openaudiomc.generic.client.ClientConnection;
import lombok.NoArgsConstructor;

import java.util.Base64;
import java.util.UUID;

@NoArgsConstructor
public class TokenFactory {

    /**
     * generate a new token
     * this is usually only done on startup
     *
     * @param client the owner
     * @return token
     */
    public ClientAuth build(ClientConnection client) {
        String key = UUID.randomUUID().toString().subSequence(0, 3).toString();

        String staticToken = client.getUser().getName() +
                ":" +
                client.getUser().getUniqueId().toString() +
                ":" +
                OpenAudioMc.getService(AuthenticationService.class).getServerKeySet().getPublicKey().getValue() +
                ":" +
                key;

        return new ClientAuth(client, key, new String(Base64.getEncoder().encode(staticToken.getBytes())));
    }

}
