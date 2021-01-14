package com.craftmend.openaudiomc.generic.voicechat;

import com.craftmend.openaudiomc.generic.voicechat.driver.VoiceServerDriver;

public class DefaultVoiceServiceImpl implements VoiceService {

    private VoiceServerDriver driver;

    public DefaultVoiceServiceImpl() {
        connect("http://localhost:8080/", "none");
    }

    @Override
    public void connect(String host, String password) {
        driver = new VoiceServerDriver(host, password, this);
        driver.setBlockRadius(60);
    }

    @Override
    public void shutdown() {
        if (driver != null) {
            driver.shutdown();
        }
    }
}
