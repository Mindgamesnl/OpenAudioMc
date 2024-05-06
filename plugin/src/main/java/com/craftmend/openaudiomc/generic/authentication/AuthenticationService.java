package com.craftmend.openaudiomc.generic.authentication;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.ITokenProvider;
import com.craftmend.openaudiomc.generic.authentication.driver.AuthenticationDriver;
import com.craftmend.openaudiomc.generic.authentication.driver.PluginTokenProvider;
import com.craftmend.openaudiomc.generic.authentication.objects.Key;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import com.craftmend.openaudiomc.generic.rest.types.RegistrationResponse;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import lombok.Getter;
import lombok.Setter;

@Getter
public class AuthenticationService extends Service {

    public static ITokenProvider TOKEN_PROVIDER = new PluginTokenProvider();

    @Inject
    private TaskService taskService;

    private AuthenticationDriver driver;
    private RestRequest registrationProvider;
    @Getter @Setter private Key explicitParentPublicKey;
    @Getter private final ServerKeySet serverKeySet = new ServerKeySet();
    @Setter private boolean isSuccessful = false;
    private final String failureMessage = "Oh no, it looks like the initial setup of OpenAudioMc has failed. Please try to restart the server and try again, if that still does not work, please contact OpenAudioMc staff or support.";
    @Getter private final int currentKeyVersion = 5;
    @Setter private boolean isNewAccount = false;

    @Override
    public void onEnable() {
        initialize();
    }

    public void initialize() {
        driver = new AuthenticationDriver(this);
        registrationProvider = new RestRequest(RegistrationResponse.class, Endpoint.REGISTER);

        // add provisioning key, if we have it, look for it in the launch properties
        String provisioningKey = System.getProperty("openaudio.provisioningKey");
        if (provisioningKey != null) {
            registrationProvider.setQuery("provisioningKey", provisioningKey);
        }

        OpenAudioLogger.info("Starting authentication module");
        loadData();
        explicitParentPublicKey = serverKeySet.getPublicKey();
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
        config.setString(StorageKey.AUTH_PRIVATE_KEY, serverKeySet.getPrivateKey().getValue());
        config.setString(StorageKey.AUTH_PUBLIC_KEY, serverKeySet.getPublicKey().getValue());
        config.setInt(StorageLocation.DATA_FILE, StorageKey.AUTH_KEY_VERSION.getPath(), currentKeyVersion);
        config.saveAll(false);
    }
}
