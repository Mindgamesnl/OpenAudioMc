package com.craftmend.openaudiomc.generic.authentication;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.requests.ClientTokenRequestBody;
import com.craftmend.openaudiomc.generic.authentication.requests.ClientTokenResponseBody;
import com.craftmend.openaudiomc.generic.authentication.response.HostDetailsResponse;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.networking.rest.responses.RegistrationResponse;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.authentication.objects.Key;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;

import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.voicechat.api.util.Task;
import lombok.Getter;

@Getter
public class AuthenticationService {

    private RestRequest registrationProvider;
    private final ServerKeySet serverKeySet = new ServerKeySet();
    private boolean isSuccessful = false;
    private final String failureMessage = "Oh no, it looks like the initial setup of OpenAudioMc has failed. Please try to restart the server and try again, if that still does not work, please contact OpenAudioMc staff or support.";

    private final int currentKeyVersion = 3;

    public void initialize() {
        registrationProvider = new RestRequest(RestEndpoint.PLUS_REGISTER);
        OpenAudioLogger.toConsole("Starting authentication module");
        loadData();
    }

    /**
     * version of the authentication version that's currently stored
     *
     * @return version
     */
    public int getAuthVersion() {
        int version = OpenAudioMc.getInstance().getConfiguration().getInt(StorageKey.AUTH_KEY_VERSION);
        return version == -1 ? 1 : version;
    }

    /**
     * Load the tokens from files.
     * If they dont exist, then they will be requested by the cool oa api.
     */
    private void loadData() {
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();

        // create token if new
        if (config.getString(StorageKey.AUTH_PRIVATE_KEY).equals("not-set") || getAuthVersion() != currentKeyVersion) {
            OpenAudioLogger.toConsole("Creating account...");
            //setup process
            ApiResponse response = registrationProvider.executeInThread();
            if (response.getErrors().isEmpty()) {
                initializeToken(response.getResponse(RegistrationResponse.class), config);
                isSuccessful = true;
            } else {
                OpenAudioLogger.toConsole("Failed to request token. Error: " + OpenAudioMc.getGson().toJson(response.getErrors()));
                isSuccessful = false;
            }
            return;
        }

        // paddle back
        OpenAudioLogger.toConsole("This server already has an account, skipping sign up.");
        serverKeySet.setPrivateKey(new Key(config.getString(StorageKey.AUTH_PRIVATE_KEY)));
        serverKeySet.setPublicKey(new Key(config.getString(StorageKey.AUTH_PUBLIC_KEY)));
        isSuccessful = true;
    }

    private void initializeToken(RegistrationResponse registrationResponse, ConfigurationImplementation config) {
        serverKeySet.setPrivateKey(new Key(registrationResponse.getPrivateKey()));
        serverKeySet.setPublicKey(new Key(registrationResponse.getPublicKey()));
        config.setString(StorageKey.AUTH_PRIVATE_KEY, serverKeySet.getPrivateKey().getValue());
        config.setString(StorageKey.AUTH_PUBLIC_KEY, serverKeySet.getPublicKey().getValue());
        config.setInt(StorageLocation.DATA_FILE, StorageKey.AUTH_KEY_VERSION.getPath(), currentKeyVersion);
        config.saveAll();
    }

    // create an async client token, the returned string is the token itself, always runs async
    public Task<String> createPlayerSession(Authenticatable authenticatable) {
        Task<String> task = new Task<>();
        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
            // create request
            ClientTokenRequestBody requestBody = new ClientTokenRequestBody(
                    authenticatable.getOwnerName(),
                    authenticatable.getOwnerUUID().toString(),
                    authenticatable.getSessionTokens().getKey(),
                    serverKeySet.getPublicKey().getValue()
            );

            ApiResponse request = new RestRequest(RestEndpoint.WORKERS_CREATE_SESSION)
                    .setBody(requestBody)
                    .executeInThread();

            if (!request.getErrors().isEmpty()) {
                task.fail(request.getErrors().get(0).getCode());
                return;
            }

            task.success(request.getResponse(ClientTokenResponseBody.class).getToken());
        });
        return task;
    }

    public HostDetailsResponse getHost() {
        RestRequest request = new RestRequest(RestEndpoint.GET_HOST_DETAILS);
        ApiResponse response = request.executeInThread();
        if (response.getErrors().size() > 0) throw new IllegalStateException("Could not load host details");
        return response.getResponse(HostDetailsResponse.class);
    }
}
