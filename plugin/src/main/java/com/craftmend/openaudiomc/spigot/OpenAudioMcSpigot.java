package com.craftmend.openaudiomc.spigot;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.services.state.states.IdleState;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;

import com.craftmend.openaudiomc.spigot.modules.commands.CommandModule;
import com.craftmend.openaudiomc.spigot.modules.players.PlayerModule;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerModule;

import lombok.Getter;
import org.bukkit.plugin.java.JavaPlugin;

import java.time.Duration;
import java.time.Instant;

@Getter
public final class OpenAudioMcSpigot extends JavaPlugin {

    /**
     * services OpenAudioMc uses in the background
     *
     *  - State service (keeps track of connections and state of the api)
     *  - Server service (compatibility and stuff)
     *  - authentication (auth)
     *  - time service (time sync with clients)
     *  - networking service (api connection)
     */
    private ServerService serverService;

    /**
     * modules that make up the plugin
     *
     * - player module (manages player connections)
     * - region module (OPTIONAL) (only loads regions if WorldGuard is enabled)
     * - command module (registers and loads the OpenAudioMc commands)
     * - media module (loads and manages all media in the service)
     */
    private PlayerModule playerModule;
    private RegionModule regionModule;
    private CommandModule commandModule;
    private SpeakerModule speakerModule;

    /**
     * Constant: main plugin instance
     */
    @Getter private static OpenAudioMcSpigot instance;

    /**
     * load the plugin and start all of it's independent modules and services
     * this is in a specific order
     */
    @Override
    public void onEnable() {
        // Timing
        Instant boot = Instant.now();

        // setup core
        new OpenAudioMcCore(Platform.SPIGOT);

        // Plugin startup logic
        instance = this;

        // startup modules and services
        this.serverService = new ServerService();
        this.playerModule = new PlayerModule(this);
        this.speakerModule = new SpeakerModule(this);
        this.commandModule = new CommandModule(this);

        // optional modules
        if (getServer().getPluginManager().isPluginEnabled("WorldGuard")) {
            this.regionModule = new RegionModule(this);
        }

        // set state to idle, to allow connections and such
        OpenAudioMcCore.getInstance().getStateService().setState(new IdleState("OpenAudioMc started and awaiting command"));

        // timing end and calc
        Instant finish = Instant.now();
        System.out.println(OpenAudioMcCore.getLOG_PREFIX() + "Starting and loading took " + Duration.between(boot, finish).toMillis() + "MS");
    }

    /**
     * save configuration and stop the plugin
     */
    @Override
    public void onDisable() {
        configurationModule.saveAll();
        if (OpenAudioMcCore.getInstance().getStateService().getCurrentState().isConnected()) {
            this.networkingService.stop();
        }
    }
}
