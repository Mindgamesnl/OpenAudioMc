package com.craftmend.openaudiomc.generic.voicechat;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.voicechat.driver.VoiceServerDriver;

public class DefaultVoiceServiceImpl implements VoiceService {

    private VoiceServerDriver driver;

    private String host;
    private String password;
    private boolean enabled = false;

    public DefaultVoiceServiceImpl() {
        this.host = StorageKey.AUTH_VOICE_SERVER.getString();
        this.password = StorageKey.AUTH_VOICE_PASSWORD.getString();

        if (this.host != null && !this.host.equals("not-a-partner")) {
            connect(this.host, this.password);
            this.enabled = true;
        }
    }

    @Override
    public void connect(String host, String password) {
        this.host = host;
        this.password = password;
        driver = new VoiceServerDriver(host, password, this);
        driver.setBlockRadius(StorageKey.SETTINGS_VC_RADIUS.getInt());
    }

    @Override
    public void requestRestart() {
        OpenAudioLogger.toConsole("Restarting voice driver...");
        if (driver != null) {
            driver.shutdown();
        }
        this.connect(this.host, this.password);
    }

    @Override
    public void shutdown() {
        if (driver != null) {
            driver.shutdown();
        }
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
