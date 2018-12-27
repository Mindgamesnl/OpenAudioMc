package com.craftmend.openaudiomc.modules.authentication;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.authentication.objects.Key;
import com.craftmend.openaudiomc.modules.authentication.objects.ServerKeySet;

import lombok.Getter;

public class AuthenticationModule {

    @Getter private ServerKeySet serverKeySet;

    public AuthenticationModule(OpenAudioMc openAudioMc) {
        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Starting authentication module");

    }

    public Key requestServerIdentifier() {
        //TODO: http request server id endpoint
        String response = "TODO";

        if (response != "err") {
            Key key = new Key(response);
            serverKeySet.setPrivateKey(key);
            return key;
        } else {
            return null;
        }
    }

}
