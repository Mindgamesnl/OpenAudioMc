package com.craftmend.openaudiomc.generic.authentication;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.IAccountProvider;
import com.craftmend.openaudiomc.generic.authentication.driver.AuthenticationDriver;
import com.craftmend.openaudiomc.generic.authentication.driver.CraftmendTokenProvider;
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
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
public class AuthenticationService extends Service {

    public static IAccountProvider TOKEN_PROVIDER = new CraftmendTokenProvider();

    @Inject
    private TaskService taskService;

    private AuthenticationDriver driver;
    private RestRequest registrationProvider;
    @Getter private final ServerKeySet serverKeySet = new ServerKeySet();
    @Setter private boolean isSuccessful = false;
    private final String failureMessage = "Oh no, it looks like the initial setup of OpenAudioMc has failed. Please try to restart the server and try again, if that still does not work, please contact OpenAudioMc staff or support.";
    @Getter private final int currentKeyVersion = 4;
    private Instant identityCreatedAt = null;
    private String identity = null;
    private HostDetailsResponse host;
    @Setter private boolean isNewAccount = false;

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
        TOKEN_PROVIDER.inject(taskService, this);
    }

    public void initializeToken(RegistrationResponse registrationResponse, Configuration config) {
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
