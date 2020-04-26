package com.craftmend.openaudiomc.generic.migrations.migrations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.migrations.interfaces.SimpleMigration;
import com.craftmend.openaudiomc.generic.migrations.wrapper.UploadSettingsWrapper;
import com.craftmend.openaudiomc.generic.plus.response.ClientSettingsResponse;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.core.storage.objects.ClientSettings;

public class LocalClientToPlusMigration extends SimpleMigration {

    @Override
    public boolean shouldBeRun() {
        // only do the thing when there are values
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfigurationImplementation();
        return config.hasStorageKey(StorageKey.SETTINGS_CLIENT_START_SOUND);
    }

    @Override
    public void execute() {
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfigurationImplementation();
        
        ClientSettings settings = new ClientSettings().load();
        ClientSettingsResponse clientSettingsResponse = new ClientSettingsResponse();
        // apply key so we can force it down its throat
        String privateKey = OpenAudioMc.getInstance().getAuthenticationService().getServerKeySet().getPrivateKey().getValue();

        OpenAudioLogger.toConsole("Found old legacy client settings, migrating them to OpenAudioMc+");
        if (!settings.getBackground().equals("default") && !settings.getBackground().startsWith("<un"))
            clientSettingsResponse.setBackgroundImage(settings.getBackground());

        if (!settings.getErrorMessage().equals("default") && !settings.getErrorMessage().startsWith("<un"))
            clientSettingsResponse.setClientErrorMessage(settings.getErrorMessage());

        if (!settings.getWelcomeMessage().equals("default") && !settings.getWelcomeMessage().startsWith("<un"))
            clientSettingsResponse.setClientWelcomeMessage(settings.getWelcomeMessage());

        if (!settings.getTitle().equals("default") && !settings.getTitle().startsWith("<un"))
            clientSettingsResponse.setTitle(settings.getTitle());

        // check for start sound
        ConfigurationImplementation ConfigurationImplementation = config;
        String startSound = ConfigurationImplementation.getString(StorageKey.SETTINGS_CLIENT_START_SOUND);
        if (startSound != null && !startSound.equals("none") && !startSound.startsWith("<un"))
            clientSettingsResponse.setStartSound(startSound);

        RestRequest upload = new RestRequest(RestEndpoint.ENDPOINT_PLUS_SAVE_SETTINGS);
        upload.setBody(OpenAudioMc.getGson().toJson(new UploadSettingsWrapper(privateKey, clientSettingsResponse)));
        upload.executeSync();

        migrateFilesFromResources();
    }
}
