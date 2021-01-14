package com.craftmend.openaudiomc.generic.voicechat;

import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.voicechat.driver.VoiceServerDriver;

public class DefaultVoiceServiceImpl implements VoiceService {

    private VoiceServerDriver driver;

    public DefaultVoiceServiceImpl() {
        connect("http://192.168.2.150:8080/", "none");
    }

    @Override
    public void connect(String host, String password) {
        driver = new VoiceServerDriver(host, password, this);
        driver.setBlockRadius(StorageKey.SETTINGS_VC_RADIUS.getInt());
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
