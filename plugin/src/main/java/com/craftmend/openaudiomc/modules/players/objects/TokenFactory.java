package com.craftmend.openaudiomc.modules.players.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.NoArgsConstructor;

import java.util.Base64;

@NoArgsConstructor
class TokenFactory {

    String build(WebConnection client) {
        String url = client.getPlayer().getName() +
                ":" +
                client.getPlayer().getUniqueId().toString() +
                ":" +
                OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPublicKey().getValue() +
                ":" +
                client.getPin();
        return new String(Base64.getEncoder().encode(url.getBytes()));
    }

}
