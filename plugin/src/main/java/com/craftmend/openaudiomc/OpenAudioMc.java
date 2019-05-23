package com.craftmend.openaudiomc;

import com.craftmend.openaudiomc.modules.api.objects.OpenAudioApi;
import com.craftmend.openaudiomc.modules.media.MediaModule;
import com.craftmend.openaudiomc.modules.server.ServerModule;
import com.craftmend.openaudiomc.services.authentication.AuthenticationService;
import com.craftmend.openaudiomc.modules.commands.CommandModule;
import com.craftmend.openaudiomc.modules.configuration.ConfigurationModule;
import com.craftmend.openaudiomc.services.networking.NetworkingService;
import com.craftmend.openaudiomc.services.networking.addapter.AbstractPacketAdapter;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.modules.players.PlayerModule;
import com.craftmend.openaudiomc.modules.regions.RegionModule;
import com.craftmend.openaudiomc.modules.speakers.SpeakerModule;

import com.craftmend.openaudiomc.services.time.TimeService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.Getter;
import org.bukkit.plugin.java.JavaPlugin;

@Getter
public final class OpenAudioMc extends JavaPlugin {

    /**
     * services OpenAudioMc uses in the background
     *
     *  - authentication (auth)
     *  - time service (time sync with clients)
     *  - networking service (api connection)
     */
    private TimeService timeService;
    private AuthenticationService authenticationService;
    private NetworkingService networkingService;

    /**
     * modules that make up the plugin
     *
     * - server module (loads version info)
     * - configuration module (loads user data)
     * - player module (manages player connections)
     * - region module (OPTIONAL) (only loads regions if WorldGuard is enabled)
     * - command module (registers and loads the OpenAudioMc commands)
     * - media module (loads and manages all media in the service)
     */
    private ServerModule serverModule;
    private ConfigurationModule configurationModule;
    private PlayerModule playerModule;
    private RegionModule regionModule;
    private CommandModule commandModule;
    private SpeakerModule speakerModule;
    private MediaModule mediaModule;

    /**
     * Constant: main plugin instance
     */
    @Getter private static OpenAudioMc instance;

    /**
     * Constants:
     *  - api: the api
     *  - LOG_PREFIX: the prefix in server logs
     *  - Gson: the google json instance that is used with the type adapter
     */
    @Getter private static final OpenAudioApi api = new OpenAudioApi();
    @Getter private static final String LOG_PREFIX = "[OpenAudioMc-Log] ";
    @Getter private static final Gson gson = new GsonBuilder()
            .registerTypeAdapter(AbstractPacketPayload.class, new AbstractPacketAdapter())
            .create();

    /**
     * load the plugin and start all of it's independent modules and services
     * this is in a specific order
     */
    @Override
    public void onEnable() {
        // Plugin startup logic
        instance = this;

        //startup modules and services
        this.serverModule = new ServerModule();
        this.timeService = new TimeService();
        this.mediaModule = new MediaModule();
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

    /**
     * save configuration and stop the plugin
     */
    @Override
    public void onDisable() {
        configurationModule.saveAll();
        if (this.networkingService.isConnected()) {
            this.networkingService.shutDown();
        }
    }
}
