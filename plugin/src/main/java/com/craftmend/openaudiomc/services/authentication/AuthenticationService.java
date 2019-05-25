package com.craftmend.openaudiomc.services.authentication;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.services.authentication.objects.Key;
import com.craftmend.openaudiomc.services.authentication.objects.RequestResponse;
import com.craftmend.openaudiomc.services.authentication.objects.ServerKeySet;

import lombok.Getter;
import org.bukkit.ChatColor;

import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class AuthenticationService {

    @Getter private ServerKeySet serverKeySet = new ServerKeySet();
    @Getter private Boolean isSuccesfull = false;
    @Getter private String failureMessage = ChatColor.RED + "Oh no, it looks like the initial setup of OpenAudioMc has failed. Please try to restart the server and try again, if that still does not work, please contact OpenAudioMc staff or support.";

    public AuthenticationService() {
        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Starting authentication module");
        loadData();
    }

    /**
     * Load the tokens from files.
     * If they dont exist, then they will be requested by the cool OpenAuioMc api.
     */
    private void loadData() {
        if (OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().getString("keyset.private").equals("not-set")) {
            //setup process
            try {
                RequestResponse requestResponse = OpenAudioMc.getGson().fromJson(readHttp(OpenAudioMc.getInstance().getConfigurationModule().getServer() + "/genid"), RequestResponse.class);

                if (requestResponse.getSuccess()) {
                    serverKeySet.setPrivateKey(new Key(requestResponse.getPrivateKey().toString()));
                    serverKeySet.setPublicKey(new Key(requestResponse.getPublicKey().toString()));
                    OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().set("keyset.private", serverKeySet.getPrivateKey().getValue());
                    OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().set("keyset.public", serverKeySet.getPublicKey().getValue());
                    isSuccesfull = true;
                } else {
                    System.out.println(OpenAudioMc.getLOG_PREFIX() + "Failed to request token.");
                    isSuccesfull = false;
                }
            } catch (IOException e) {
                System.out.println(OpenAudioMc.getLOG_PREFIX() + "Failed to request token.");
                isSuccesfull = false;
                e.printStackTrace();
            }
        } else {
            serverKeySet.setPrivateKey(new Key(OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().getString("keyset.private")));
            serverKeySet.setPublicKey(new Key(OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().getString("keyset.public")));
            isSuccesfull = true;
        }
    }

    /**
     * A small util function, does only one thing really and only once.
     * Almost as useless as i am.
     *
     * @param url The url
     * @return The response
     * @throws IOException a big fuck you
     */
    private String readHttp(String url) throws IOException {
        try (Scanner scanner = new Scanner(new URL(url).openStream(),
                StandardCharsets.UTF_8.toString())) {
            scanner.useDelimiter("\\A");
            return scanner.hasNext() ? scanner.next() : "";
        }
    }

}
