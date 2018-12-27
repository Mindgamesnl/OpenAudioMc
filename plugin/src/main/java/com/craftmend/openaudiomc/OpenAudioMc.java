package com.craftmend.openaudiomc;

import com.craftmend.openaudiomc.modules.api.ApiModule;
import com.craftmend.openaudiomc.modules.authentication.AuthenticationModule;
import com.craftmend.openaudiomc.modules.configuration.ConfigurationModule;
import com.craftmend.openaudiomc.modules.media.MediaModule;
import com.craftmend.openaudiomc.modules.networking.NetworkingModule;
import com.craftmend.openaudiomc.modules.players.PlayerModule;

import lombok.Getter;
import org.bukkit.plugin.java.JavaPlugin;

@Getter
public final class OpenAudioMc extends JavaPlugin {

    //modules
    private ConfigurationModule configurationModule;
    private AuthenticationModule authenticationModule;
    private MediaModule mediaModule;
    private PlayerModule playerModule;
    private NetworkingModule networkingModule;
    private ApiModule apiModule;

    //instance
    @Getter private static OpenAudioMc instance;


    //static strings
    @Getter private static final String LOG_PREFIX = "[OpenAudioMc-Log] ";


    @Override
    public void onEnable() {
        // Plugin startup logic
        instance = this;

        //startup modules
        this.authenticationModule = new AuthenticationModule(this);
        this.configurationModule = new ConfigurationModule(this);
        this.mediaModule = new MediaModule(this);
        this.playerModule = new PlayerModule(this);
        this.networkingModule = new NetworkingModule(this);
        this.apiModule = new ApiModule(this);

    }

    @Override
    public void onDisable() {
        // Plugin shutdown logic
    }
}
