package com.craftmend.openaudiomc.modules.players.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.NoArgsConstructor;

import java.util.Base64;

@NoArgsConstructor
public class TokenFactory {

    public String build(Client client) {
        StringBuilder urlBuilder = new StringBuilder();
        urlBuilder.append(client.getPlayer().getName());
        urlBuilder.append(":");
        urlBuilder.append(client.getPlayer().getUniqueId().toString());
        urlBuilder.append(":");
        urlBuilder.append(OpenAudioMc.getInstance().getAuthenticationModule().getServerKeySet().getPublicKey().getValue());
        urlBuilder.append(":");
        urlBuilder.append(client.getPin());
        return new String(Base64.getEncoder().encode(urlBuilder.toString().getBytes()));
    }

}
