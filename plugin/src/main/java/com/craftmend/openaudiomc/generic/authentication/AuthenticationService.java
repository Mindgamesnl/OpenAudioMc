package com.craftmend.openaudiomc.generic.authentication;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.loggin.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.rest.responses.RegistrationResponse;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.interfaces.OAConfiguration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.authentication.objects.Key;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;

import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.google.gson.Gson;
import lombok.Getter;

public class AuthenticationService {

    private RestRequest registrationProvider = new RestRequest("/api/v1/servers/register");

    @Getter private ServerKeySet serverKeySet = new ServerKeySet();
    @Getter private boolean isSuccesfull = false;
    @Getter private String failureMessage = "Oh no, it looks like the initial setup of OpenAudioMc has failed. Please try to restart the server and try again, if that still does not work, please contact OpenAudioMc staff or support.";
    private final int keyVersion = 3; // OpenAudioMc-Plus update

    public AuthenticationService(Runnable callback) throws Exception {
        OpenAudioLogger.toConsole("Starting authentication module");
        loadData(callback);

        // if (!isSuccesfull) throw new IllegalStateException("Failed to parse tokens");
    }

    /**
     * version of the authentication version that's currently stored
     * @return version
     */
    public int getAuthVersion() {
        int version = OpenAudioMc.getInstance().getOAConfiguration().getInt(StorageKey.AUTH_KEY_VERSION);
        return version == -1 ? 1 : version;
    }

    /**
     * Load the tokens from files.
     * If they dont exist, then they will be requested by the cool OpenAuioMc api.
     */
    private void loadData(Runnable whenFinished) throws Exception {
        OAConfiguration spigotConfigurationModule = OpenAudioMc.getInstance().getOAConfiguration();

        if (spigotConfigurationModule.getString(StorageKey.AUTH_PRIVATE_KEY).equals("not-set") || getAuthVersion() != keyVersion) {
            //setup process
            registrationProvider.execute()
                    .thenAccept((response -> {
                        try {
                            if (response.getErrors().isEmpty()) {
                                RegistrationResponse registrationResponse = response.getResponse(RegistrationResponse.class);
                                serverKeySet.setPrivateKey(new Key(registrationResponse.getPrivateKey()));
                                serverKeySet.setPublicKey(new Key(registrationResponse.getPublicKey()));
                                spigotConfigurationModule.setString(StorageKey.AUTH_PRIVATE_KEY, serverKeySet.getPrivateKey().getValue());
                                spigotConfigurationModule.setString(StorageKey.AUTH_PUBLIC_KEY, serverKeySet.getPublicKey().getValue());
                                spigotConfigurationModule.setInt(StorageLocation.DATA_FILE, StorageKey.AUTH_KEY_VERSION.getPath(), keyVersion);
                                isSuccesfull = true;
                            } else {
                                OpenAudioLogger.toConsole("Failed to request token. Error: " + new Gson().toJson(response.getErrors()));
                                isSuccesfull = false;
                            }
                            whenFinished.run();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }));
        } else {
            serverKeySet.setPrivateKey(new Key(spigotConfigurationModule.getString(StorageKey.AUTH_PRIVATE_KEY)));
            serverKeySet.setPublicKey(new Key(spigotConfigurationModule.getString(StorageKey.AUTH_PUBLIC_KEY)));
            isSuccesfull = true;
            whenFinished.run();
        }
    }
}
