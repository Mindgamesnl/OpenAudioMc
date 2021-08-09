package com.craftmend.openaudiomc.spigot;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.RegistryApiImpl;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.platform.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.states.WorkerState;
import com.craftmend.openaudiomc.generic.state.states.IdleState;

import com.craftmend.openaudiomc.generic.voicechat.DefaultVoiceServiceImpl;
import com.craftmend.openaudiomc.generic.voicechat.VoiceService;
import com.craftmend.openaudiomc.spigot.modules.commands.SpigotCommandService;
import com.craftmend.openaudiomc.spigot.modules.configuration.SpigotConfiguration;
import com.craftmend.openaudiomc.spigot.modules.predictive.PredictiveMediaService;
import com.craftmend.openaudiomc.spigot.modules.proxy.ProxyModule;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import com.craftmend.openaudiomc.spigot.modules.punishments.LitebansIntegration;
import com.craftmend.openaudiomc.spigot.modules.regions.service.RegionService;
import com.craftmend.openaudiomc.spigot.modules.shortner.AliasService;
import com.craftmend.openaudiomc.spigot.modules.show.ShowService;
import com.craftmend.openaudiomc.spigot.modules.traincarts.TrainCartsModule;
import com.craftmend.openaudiomc.spigot.modules.traincarts.service.TrainCartsService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.SpigotVoiceChatService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.FilterService;
import com.craftmend.openaudiomc.spigot.services.dependency.SpigotDependencyService;
import com.craftmend.openaudiomc.spigot.services.scheduling.SpigotTaskService;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.spigot.modules.players.PlayerService;
import com.craftmend.openaudiomc.spigot.modules.regions.RegionModule;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.services.threading.ExecutorService;

import lombok.Getter;
import lombok.Setter;
import org.bukkit.Bukkit;
import org.bukkit.event.HandlerList;
import org.bukkit.event.Listener;
import org.bukkit.plugin.java.JavaPlugin;

import java.time.Duration;
import java.time.Instant;
import java.util.logging.Level;

@Getter
public final class OpenAudioMcSpigot extends JavaPlugin implements OpenAudioInvoker {

    @Setter private TrainCartsModule trainCartsModule;
    @Setter private RegionModule regionModule;
    private OpenAudioMc openAudioMc;
    private ProxyModule proxyModule;
    private boolean bound = false;

    /**
     * Constant: main plugin instance and plugin timing
     */
    @Getter private static OpenAudioMcSpigot instance;
    private final Instant boot = Instant.now();

    /**
     * load the plugin and start all of it's independent modules and services
     * this is in a specific order
     */
    @Override
    public void onEnable() {
        // Plugin startup logic
        instance = this;

        if (System.getenv("OA_LATE_BIND") != null && !bound) {
            getLogger().log(Level.INFO, "Using late bind! not doing anything for now...");
            bound = true;
            return;
        }

        proxyModule = new ProxyModule();

        // setup core
        try {
            openAudioMc = new OpenAudioMc(this);
            openAudioMc.getServiceManager().registerDependency(ProxyModule.class, proxyModule);
            openAudioMc.getServiceManager().registerDependency(OpenAudioMcSpigot.class, this);

            openAudioMc.getServiceManager().loadServices(
                    SpigotDependencyService.class,
                    AliasService.class,
                    ExecutorService.class,
                    ServerService.class,
                    PlayerService.class,
                    SpeakerService.class,
                    SpigotCommandService.class,
                    ShowService.class,
                    PredictiveMediaService.class,
                    SpigotVoiceChatService.class,
                    FilterService.class
            );

            OpenAudioMc.getService(SpigotDependencyService.class)
                    .ifPluginEnabled("LiteBans", new LitebansIntegration())
                    .ifPluginEnabled("WorldGuard", new RegionService(this))
                    .ifPluginEnabled("Train_Carts", new TrainCartsService(this));

            // set state to idle, to allow connections and such, but only if not a node
            if (OpenAudioMc.getService(ProxyModule.class).getMode() == ClientMode.NODE) {
                OpenAudioMc.getService(StateService.class).setState(new WorkerState());
            } else {
                OpenAudioMc.getService(StateService.class).setState(new IdleState("OpenAudioMc started and awaiting command"));
            }

            // timing end and calc
            Instant finish = Instant.now();
            OpenAudioLogger.toConsole("Starting and loading took " + Duration.between(boot, finish).toMillis() + "MS");
        } catch (Exception e) {
            OpenAudioLogger.handleException(e);
            e.printStackTrace();
            Bukkit.getServer().getPluginManager().disablePlugin(this);
        }
    }

    /**
     * save configuration and stop the plugin
     */
    @Override
    public void onDisable() {
        OpenAudioLogger.toConsole("Shutting down");
        OpenAudioMc.getService(PredictiveMediaService.class).onDisable();
        openAudioMc.disable();
        HandlerList.unregisterAll(this);
        OpenAudioLogger.toConsole("Stopped OpenAudioMc. Goodbye.");
    }

    public void registerEvents(Listener... listeners) {
        for (Listener listener : listeners) {
            getServer().getPluginManager().registerEvents(listener, this);
        }
    }

    @Override
    public boolean hasPlayersOnline() {
        return !Bukkit.getOnlinePlayers().isEmpty();
    }

    @Override
    public boolean isNodeServer() {
        return proxyModule.getMode() != ClientMode.STAND_ALONE;
    }

    @Override
    public Platform getPlatform() {
        return Platform.SPIGOT;
    }

    @Override
    public Class<? extends NetworkingService> getServiceClass() {

        // check if there's a forced service
        Class<? extends NetworkingService> forced = ((RegistryApiImpl) AudioApi.getInstance().getRegistryApi()).getForcedService();
        if (forced != null) {
            return forced;
        }

        return proxyModule.getMode().getServiceClass();
    }

    @Override
    public TaskService getTaskProvider() {
        return new SpigotTaskService();
    }

    @Override
    public Configuration getConfigurationProvider() {
        return new SpigotConfiguration(OpenAudioMcSpigot.getInstance());
    }

    @Override
    public String getPluginVersion() {
        return getDescription().getVersion();
    }

    @Override
    public int getServerPort() {
        return Bukkit.getPort();
    }

    @Override
    public VoiceService getVoiceService() {
        return new DefaultVoiceServiceImpl();
    }

}
