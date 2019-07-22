package com.craftmend.openaudiomc.spigot.modules.players.objects;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import lombok.NoArgsConstructor;

import java.util.Base64;
import java.util.UUID;

@NoArgsConstructor
class TokenFactory {

    /**
     * generate a new token
     * this is usually only done on startup
     *
     * @param client the owner
     * @return token
     */
    Session build(WebConnection client) {
        String key = UUID.randomUUID().toString().subSequence(0, 3).toString();
        String url = client.getPlayer().getName() +
                ":" +
                client.getPlayer().getUniqueId().toString() +
                ":" +
                OpenAudioMcSpigot.getInstance().getAuthenticationService().getServerKeySet().getPublicKey().getValue() +
                ":" +
                key;
        return new Session(client, key, new String(Base64.getEncoder().encode(url.getBytes())));
    }

}
