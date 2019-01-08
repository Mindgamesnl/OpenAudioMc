package com.craftmend.openaudiomc.modules.authentication;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.authentication.objects.Key;
import com.craftmend.openaudiomc.modules.authentication.objects.RequestResponse;
import com.craftmend.openaudiomc.modules.authentication.objects.ServerKeySet;

import lombok.Getter;

import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class AuthenticationModule {

    @Getter
    private ServerKeySet serverKeySet = new ServerKeySet();

    public AuthenticationModule() {
        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Starting authentication module");
        loadData();
    }

    private void loadData() {
        if (OpenAudioMc.getInstance().getConfig().getString("keyset.private").equals("not-set")) {
            //setup process
            try {
                RequestResponse requestResponse = OpenAudioMc.getGson().fromJson(readHttp(OpenAudioMc.getInstance().getConfigurationModule().getServer() + "/genid"), RequestResponse.class);

                if (requestResponse.getSuccess()) {
                    serverKeySet.setPrivateKey(new Key(requestResponse.getPrivateKey().toString()));
                    serverKeySet.setPublicKey(new Key(requestResponse.getPublicKey().toString()));
                    OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().set("keyset.private", serverKeySet.getPrivateKey().getValue());
                    OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().set("keyset.public", serverKeySet.getPublicKey().getValue());
                } else {
                    System.out.println(OpenAudioMc.getLOG_PREFIX() + "Failed to request token.");
                }
            } catch (IOException e) {
                System.out.println(OpenAudioMc.getLOG_PREFIX() + "Failed to request token.");
                e.printStackTrace();
            }
        } else {
            serverKeySet.setPrivateKey(new Key(OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().getString("keyset.private")));
            serverKeySet.setPublicKey(new Key(OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().getString("keyset.public")));
        }
    }

    private String readHttp(String url) throws IOException {
        try (Scanner scanner = new Scanner(new URL(url).openStream(),
                StandardCharsets.UTF_8.toString())) {
            scanner.useDelimiter("\\A");
            return scanner.hasNext() ? scanner.next() : "";
        }
    }

}
