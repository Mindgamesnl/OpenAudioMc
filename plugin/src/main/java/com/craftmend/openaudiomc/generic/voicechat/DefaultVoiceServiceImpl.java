package com.craftmend.openaudiomc.generic.voicechat;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.voicechat.driver.VoiceServerDriver;

public class DefaultVoiceServiceImpl implements VoiceService {

    private VoiceServerDriver driver;

    private String host;
    private String password;


    public DefaultVoiceServiceImpl() {
        connect("http://192.168.2.150:8080/", "none");
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
        return true;
    }
}
