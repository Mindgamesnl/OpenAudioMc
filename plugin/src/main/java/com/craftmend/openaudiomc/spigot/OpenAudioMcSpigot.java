package com.craftmend.openaudiomc.spigot;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.modules.commands.SpigotCommandModule;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.craftmend.openaudiomc.spigot.modules.proxy.ProxyModule;
import com.craftmend.openaudiomc.spigot.modules.show.ShowModule;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;

import com.craftmend.openaudiomc.spigot.modules.players.PlayerModule;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerModule;

import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.event.HandlerList;
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
     * - ProxyModule (manages bungeecord link)
     * - player module (manages player connections)
     * - region module (OPTIONAL) (only loads regions if WorldGuard is enabled)
     * - command module (registers and loads the OpenAudioMc commands)
     * - media module (loads and manages all media in the service)
     * - show module (manages shows)
     */
    private ProxyModule proxyModule;
    private PlayerModule playerModule;
    private RegionModule regionModule;
    private SpigotCommandModule commandModule;
    private SpeakerModule speakerModule;
    private ShowModule showModule;

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

        // Plugin startup logic
        instance = this;

        // setup loader
        this.proxyModule = new ProxyModule();

        // setup core
        try {
            new OpenAudioMc(Platform.SPIGOT, proxyModule.getMode().serviceClass);
        } catch (Exception e) {
            Bukkit.getServer().getPluginManager().disablePlugin(this);
            e.printStackTrace();
            return;
        }

        // startup modules and services
        this.serverService = new ServerService();
        this.playerModule = new PlayerModule(this);
        this.speakerModule = new SpeakerModule(this);
        this.commandModule = new SpigotCommandModule(this);
        this.showModule = new ShowModule(this);

        // optional modules
        if (getServer().getPluginManager().isPluginEnabled("WorldGuard")) {
            this.regionModule = new RegionModule(this);
        }

        // set state to idle, to allow connections and such
        OpenAudioMc.getInstance().getStateService().setState(new IdleState("OpenAudioMc started and awaiting command"));

        // timing end and calc
        Instant finish = Instant.now();
        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Starting and loading took " + Duration.between(boot, finish).toMillis() + "MS");
    }

    /**
     * save configuration and stop the plugin
     */
    @Override
    public void onDisable() {
        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Shutting down");
        OpenAudioMc.getInstance().getConfigurationInterface().saveAll();
        HandlerList.unregisterAll(this);
        if (OpenAudioMc.getInstance().getStateService().getCurrentState().isConnected()) {
            OpenAudioMc.getInstance().getNetworkingService().stop();
        }
        System.out.println(OpenAudioMc.getLOG_PREFIX() + "Stopped OpenAudioMc. Goodbye.");
    }

}
