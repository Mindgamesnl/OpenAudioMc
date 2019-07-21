package com.craftmend.openaudiomc.services.authentication;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.configuration.ConfigurationModule;
import com.craftmend.openaudiomc.modules.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.services.authentication.objects.Key;
import com.craftmend.openaudiomc.services.authentication.objects.ServerKeySet;

import com.craftmend.openaudiomc.services.networking.addapter.GenericApiResponse;
import com.craftmend.openaudiomc.services.networking.rest.RestRequest;
import lombok.Getter;
import org.bukkit.ChatColor;

import java.io.IOException;

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
        ConfigurationModule configurationModule = OpenAudioMc.getInstance().getConfigurationModule();

        if (configurationModule.getString(StorageKey.AUTH_PRIVATE_KEY).equals("not-set")) {
            //setup process
            try {
                GenericApiResponse genericApiResponse = new RestRequest("/signup").execute();

                if (genericApiResponse.getErrors().size() == 0) {
                    serverKeySet.setPrivateKey(new Key(genericApiResponse.getData().get(0).getPrivateKey()));
                    serverKeySet.setPublicKey(new Key(genericApiResponse.getData().get(0).getPublicKey()));
                    configurationModule.setString(StorageKey.AUTH_PRIVATE_KEY, serverKeySet.getPrivateKey().getValue());
                    configurationModule.setString(StorageKey.AUTH_PUBLIC_KEY, serverKeySet.getPublicKey().getValue());
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
            serverKeySet.setPrivateKey(new Key(configurationModule.getString(StorageKey.AUTH_PRIVATE_KEY)));
            serverKeySet.setPublicKey(new Key(configurationModule.getString(StorageKey.AUTH_PUBLIC_KEY)));
            isSuccesfull = true;
        }
    }
}
