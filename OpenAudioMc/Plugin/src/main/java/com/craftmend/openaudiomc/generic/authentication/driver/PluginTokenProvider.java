package com.craftmend.openaudiomc.generic.authentication.driver;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.ITokenProvider;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.authentication.objects.Key;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.types.RegistrationResponse;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;

import java.util.UUID;

public class PluginTokenProvider implements ITokenProvider {

    @Override
    public void inject(TaskService ts, AuthenticationService as) {
        Configuration config = OpenAudioMc.getInstance().getConfiguration();

        // create token if new
      if (config.getString(StorageKey.AUTH_PRIVATE_KEY) == null || config.getString(StorageKey.AUTH_PRIVATE_KEY).equals("not-set") || as.getAuthVersion() != as.getCurrentKeyVersion()) {
            OpenAudioLogger.info("Creating account...");

            // am I a top level server? skip setup if that's the case
            if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) {
                OpenAudioLogger.info("Skipping account setup since this isn't a master server, moving on with fake api keys.");
                as.getServerKeySet().setPrivateKey(new Key(UUID.randomUUID().toString()));
                as.getServerKeySet().setPublicKey(new Key(UUID.randomUUID().toString()));
                as.setSuccessful(true);
                return;
            }

            //setup process
            RestRequest<RegistrationResponse> response = as.getRegistrationProvider().run();

            if (!response.hasError()) {
                as.initializeToken(response.getResponse(), config);
                as.setSuccessful(true);
            } else {
                OpenAudioLogger.info("Failed to request token. Error: " + response.getError().getMessage());
                as.setSuccessful(false);
            }
            as.setNewAccount(true);
            return;
        }

        // paddle back
        OpenAudioLogger.info("This server already has an account, skipping sign up.");
        as.getServerKeySet().setPrivateKey(new Key(config.getString(StorageKey.AUTH_PRIVATE_KEY)));
        as.getServerKeySet().setPublicKey(new Key(config.getString(StorageKey.AUTH_PUBLIC_KEY)));
        as.setSuccessful(true);
    }

}
