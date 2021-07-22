package com.craftmend.openaudiomc.generic.voicechat;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.voicechat.driver.VoiceServerDriver;

import java.util.ArrayList;
import java.util.List;

public class DefaultVoiceServiceImpl implements VoiceService {

    private VoiceServerDriver driver;
    private List<Runnable> onShutdown = new ArrayList<>();

    private String host;
    private String password;
    private boolean enabled = false;
    private int slots;

    @Override
    public void connect(String host, String password, int slots) {
        this.host = host;
        this.password = password;
        this.slots = slots;
        driver = new VoiceServerDriver(host, password, this);
        driver.setBlockRadius(StorageKey.SETTINGS_VC_RADIUS.getInt());
    }

    @Override
    public void requestRestart() {
        OpenAudioLogger.toConsole("Restarting voice driver...");
        if (driver != null) {
            driver.shutdown();
        }
        this.connect(this.host, this.password, this.slots);
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

    @Override
    public int getAllowedSlots() {
        return this.slots;
    }

    @Override
    public int getUsedSlots() {
        return (int) OpenAudioMc.getService(NetworkingService.class).getClients()
                .stream()
                .filter(client -> client.getClientRtcManager().isReady())
                .count();
    }

    @Override
    public void fireShutdownEvents() {
        for (Runnable runnable : this.onShutdown) {
            runnable.run();
        }
    }

    @Override
    public void onShutdown(Runnable runnable) {
        this.onShutdown.add(runnable);
    }

    @Override
    public VoiceServerDriver getDriver() {
        return driver;
    }
}
