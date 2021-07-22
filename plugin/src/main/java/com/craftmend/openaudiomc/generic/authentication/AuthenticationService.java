package com.craftmend.openaudiomc.generic.authentication;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.driver.AuthenticationDriver;
import com.craftmend.openaudiomc.generic.authentication.response.HostDetailsResponse;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.networking.rest.responses.RegistrationResponse;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.authentication.objects.Key;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;

import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
public class AuthenticationService extends Service {

    @Inject
    private TaskService taskService;

    private AuthenticationDriver driver;
    private RestRequest registrationProvider;
    private final ServerKeySet serverKeySet = new ServerKeySet();
    private boolean isSuccessful = false;
    private final String failureMessage = "Oh no, it looks like the initial setup of OpenAudioMc has failed. Please try to restart the server and try again, if that still does not work, please contact OpenAudioMc staff or support.";
    private final int currentKeyVersion = 4;
    private Instant identityCreatedAt = null;
    private String identity = null;
    private HostDetailsResponse host;
    private boolean isNewAccount = false;

    @Override
    public void onEnable() {
        initialize();

        taskService.schduleSyncDelayedTask(this::prepareId, 20 * 2);
    }

    public void initialize() {
        driver = new AuthenticationDriver(this);
        registrationProvider = new RestRequest(RestEndpoint.PLUS_REGISTER);
        OpenAudioLogger.toConsole("Starting authentication module");
        host = driver.getHost();
        loadData();
    }

    public void prepareId() {
        identity = driver.createIdentityToken(host);
        identityCreatedAt = Instant.now();
        OpenAudioLogger.toConsole("New Identity = " + identity);
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
        Configuration config = OpenAudioMc.getInstance().getConfiguration();

        // create token if new
        if (config.getString(StorageKey.AUTH_PRIVATE_KEY).equals("not-set") || getAuthVersion() != currentKeyVersion) {
            OpenAudioLogger.toConsole("Creating account...");

            // am I a top level server? skip setup if that's the case
            if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) {
                OpenAudioLogger.toConsole("Skipping account setup since this isn't a master server, moving on with fake api keys.");
                serverKeySet.setPrivateKey(new Key(UUID.randomUUID().toString()));
                serverKeySet.setPublicKey(new Key(UUID.randomUUID().toString()));
                isSuccessful = true;
                return;
            }

            //setup process
            ApiResponse response = registrationProvider.executeInThread();
            if (response.getErrors().isEmpty()) {
                initializeToken(response.getResponse(RegistrationResponse.class), config);
                isSuccessful = true;
            } else {
                OpenAudioLogger.toConsole("Failed to request token. Error: " + OpenAudioMc.getGson().toJson(response.getErrors()));
                isSuccessful = false;
            }
            isNewAccount = true;
            return;
        }

        // paddle back
        OpenAudioLogger.toConsole("This server already has an account, skipping sign up.");
        serverKeySet.setPrivateKey(new Key(config.getString(StorageKey.AUTH_PRIVATE_KEY)));
        serverKeySet.setPublicKey(new Key(config.getString(StorageKey.AUTH_PUBLIC_KEY)));
        isSuccessful = true;
    }

    private void initializeToken(RegistrationResponse registrationResponse, Configuration config) {
        serverKeySet.setPrivateKey(new Key(registrationResponse.getPrivateKey()));
        serverKeySet.setPublicKey(new Key(registrationResponse.getPublicKey()));
        HostDetailsResponse host = driver.getHost();
        if (host.getPreProxyForward() == null) {
            config.setString(StorageKey.AUTH_HOST, host.getIpAddress());
        } else {
            config.setString(StorageKey.AUTH_HOST, host.getPreProxyForward());
        }
        config.setString(StorageKey.AUTH_COUNTRY, host.getCountryCode());
        config.setString(StorageKey.AUTH_PRIVATE_KEY, serverKeySet.getPrivateKey().getValue());
        config.setString(StorageKey.AUTH_PUBLIC_KEY, serverKeySet.getPublicKey().getValue());
        config.setInt(StorageLocation.DATA_FILE, StorageKey.AUTH_KEY_VERSION.getPath(), currentKeyVersion);
        config.saveAll();
    }
}
