package com.craftmend.openaudiomc;

import com.craftmend.openaudiomc.modules.api.objects.OpenAudioApi;
import com.craftmend.openaudiomc.services.authentication.AuthenticationService;
import com.craftmend.openaudiomc.modules.commands.CommandModule;
import com.craftmend.openaudiomc.modules.configuration.ConfigurationModule;
import com.craftmend.openaudiomc.services.networking.NetworkingService;
import com.craftmend.openaudiomc.services.networking.addapter.AbstractPacketAddapter;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.modules.players.PlayerModule;
import com.craftmend.openaudiomc.modules.regions.RegionModule;
import com.craftmend.openaudiomc.modules.speakers.SpeakerModule;

import com.craftmend.openaudiomc.services.time.TimeService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

@Getter
public final class OpenAudioMc extends JavaPlugin {

    //services
    private TimeService timeService;
    private AuthenticationService authenticationService;
    private NetworkingService networkingService;

    //modules
    private ConfigurationModule configurationModule;
    private PlayerModule playerModule;
    private RegionModule regionModule;
    private CommandModule commandModule;
    private SpeakerModule speakerModule;

    //instance
    @Getter private static OpenAudioMc instance;

    //static data
    @Getter private static final OpenAudioApi api = new OpenAudioApi();
    @Getter private static final String LOG_PREFIX = "[OpenAudioMc-Log] ";
    @Getter private static final Gson gson = new GsonBuilder()
            .registerTypeAdapter(AbstractPacketPayload.class, new AbstractPacketAddapter())
            .create();

    @Override
    public void onEnable() {
        // Plugin startup logic
        instance = this;

        //startup modules and services
        this.timeService = new TimeService();
        this.configurationModule = new ConfigurationModule(this);
        this.authenticationService = new AuthenticationService();
        this.playerModule = new PlayerModule(this);
        this.networkingService = new NetworkingService(this);
        this.speakerModule = new SpeakerModule(this);
        this.commandModule = new CommandModule(this);

        //optional modules
        if (getServer().getPluginManager().isPluginEnabled("WorldGuard")) {
            this.regionModule = new RegionModule(this);
        }
    }

    @Override
    public void onDisable() {
        configurationModule.saveAll();
    }
}
