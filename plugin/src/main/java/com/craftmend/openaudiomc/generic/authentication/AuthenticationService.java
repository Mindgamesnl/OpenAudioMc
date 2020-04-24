package com.craftmend.openaudiomc.generic.authentication;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.GenericApiResponse;
import com.craftmend.openaudiomc.generic.networking.rest.responses.RegistrationResponse;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.authentication.objects.Key;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;

import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import lombok.Getter;

public class AuthenticationService {

    private RestRequest registrationProvider;

    @Getter
    private ServerKeySet serverKeySet = new ServerKeySet();
    @Getter
    private boolean isSuccesfull = false;
    @Getter
    private String failureMessage = "Oh no, it looks like the initial setup of OpenAudioMc has failed. Please try to restart the server and try again, if that still does not work, please contact OpenAudioMc staff or support.";
    private final int keyVersion = 3; // OpenAudioMc-Plus update

    public AuthenticationService initialize() {
        registrationProvider = new RestRequest(RestEndpoint.ENDPOINT_REGISTER);
        OpenAudioLogger.toConsole("Starting authentication module");
        loadData();
        return this;
    }

    /**
     * version of the authentication version that's currently stored
     *
     * @return version
     */
    public int getAuthVersion() {
        int version = OpenAudioMc.getInstance().getConfigurationImplementation().getInt(StorageKey.AUTH_KEY_VERSION);
        return version == -1 ? 1 : version;
    }

    /**
     * Load the tokens from files.
     * If they dont exist, then they will be requested by the cool OpenAuioMc api.
     */
    private void loadData() {
        ConfigurationImplementation spigotConfigurationModule = OpenAudioMc.getInstance().getConfigurationImplementation();

        if (spigotConfigurationModule.getString(StorageKey.AUTH_PRIVATE_KEY).equals("not-set") || getAuthVersion() != keyVersion) {
            OpenAudioLogger.toConsole("Creating account...");
            //setup process
            GenericApiResponse response = registrationProvider.executeSync();
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
                    OpenAudioLogger.toConsole("Failed to request token. Error: " + OpenAudioMc.getGson().toJson(response.getErrors()));
                    isSuccesfull = false;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

        } else {
            OpenAudioLogger.toConsole("This server already has an account, skipping signup.");
            serverKeySet.setPrivateKey(new Key(spigotConfigurationModule.getString(StorageKey.AUTH_PRIVATE_KEY)));
            serverKeySet.setPublicKey(new Key(spigotConfigurationModule.getString(StorageKey.AUTH_PUBLIC_KEY)));
            isSuccesfull = true;
        }
    }
}
