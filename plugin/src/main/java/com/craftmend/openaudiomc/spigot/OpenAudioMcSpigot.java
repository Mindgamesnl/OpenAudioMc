package com.craftmend.openaudiomc.spigot;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.RegistryApiImpl;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.logging.platform.GenericLogAdapter;
import com.craftmend.openaudiomc.spigot.modules.users.SpigotUserHooks;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.platform.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.states.WorkerState;
import com.craftmend.openaudiomc.generic.state.states.IdleState;

import com.craftmend.openaudiomc.generic.rd.RestDirectService;
import com.craftmend.openaudiomc.spigot.modules.commands.SpigotCommandService;
import com.craftmend.openaudiomc.spigot.modules.configuration.SpigotConfiguration;
import com.craftmend.openaudiomc.spigot.modules.placeholderapi.service.PlaceholderService;
import com.craftmend.openaudiomc.spigot.modules.playlists.PlaylistService;
import com.craftmend.openaudiomc.spigot.modules.predictive.PredictiveMediaService;
import com.craftmend.openaudiomc.spigot.modules.proxy.ProxyModule;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.OAClientMode;
import com.craftmend.openaudiomc.spigot.modules.punishments.EssentialsIntegration;
import com.craftmend.openaudiomc.spigot.modules.punishments.LitebansIntegration;
import com.craftmend.openaudiomc.spigot.modules.regions.service.RegionService;
import com.craftmend.openaudiomc.spigot.modules.rules.MediaRuleService;
import com.craftmend.openaudiomc.spigot.modules.shortner.AliasService;
import com.craftmend.openaudiomc.spigot.modules.show.ShowService;
import com.craftmend.openaudiomc.spigot.modules.traincarts.TrainCartsModule;
import com.craftmend.openaudiomc.spigot.modules.traincarts.service.TrainCartsService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.SpigotVoiceChatService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.VoiceChannelService;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.FilterService;
import com.craftmend.openaudiomc.spigot.services.dependency.SpigotDependencyService;
import com.craftmend.openaudiomc.spigot.services.scheduling.SpigotTaskService;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
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
        MagicValue.overWrite(MagicValue.STORAGE_DIRECTORY, getDataFolder());
        MagicValue.loadArguments();

        // set logger
        OpenAudioLogger.setLogAdapter(new GenericLogAdapter(getLogger()));

        if (MagicValue.PLATFORM_FORCE_LATE_FIND.get(Boolean.class) != null && MagicValue.PLATFORM_FORCE_LATE_FIND.get(Boolean.class) && !bound) {
            OpenAudioLogger.warn("Using late bind! not doing anything for now...");
            bound = true;
            return;
        }

        // setup core
        try {
            proxyModule = new ProxyModule();
            openAudioMc = new OpenAudioMc(this);
            openAudioMc.getServiceManager().registerDependency(ProxyModule.class, proxyModule);
            openAudioMc.getServiceManager().registerDependency(OpenAudioMcSpigot.class, this);

            // manually register the proxy module
            // it won't fully get registered because it gets manually injected
            // instead of being picked up by the service manager
            // causing an issue with dependencies (configuration)
            proxyModule.onEnable();

            openAudioMc.getServiceManager().loadServices(
                    SpigotDependencyService.class,
                    AliasService.class,
                    ExecutorService.class,
                    ServerService.class,
                    SpigotPlayerService.class,
                    SpeakerService.class,
                    SpigotCommandService.class,
                    ShowService.class,
                    PredictiveMediaService.class,
                    SpigotVoiceChatService.class,
                    VoiceChannelService.class,
                    FilterService.class,
                    MediaRuleService.class,
                    PlaylistService.class
            );

            OpenAudioMc.getService(SpigotDependencyService.class)
                    .ifPluginEnabled("LiteBans", new LitebansIntegration())
                    .ifPluginEnabled("Essentials", new EssentialsIntegration())
                    .ifPluginEnabled("WorldGuard", new RegionService(this))
                    .ifPluginEnabled("Train_Carts", new TrainCartsService(this))
                    .ifPluginEnabled("PlaceholderAPI", new PlaceholderService(this));

            // set state to idle, to allow connections and such, but only if not a node
            if (OpenAudioMc.getService(ProxyModule.class).getMode() == OAClientMode.NODE) {
                OpenAudioMc.getService(StateService.class).setState(new WorkerState());
            } else {
                OpenAudioMc.getService(RestDirectService.class).boot();
                OpenAudioMc.getService(StateService.class).setState(new IdleState("OpenAudioMc started and awaiting command"));
            }

            // timing end and calc
            Instant finish = Instant.now();
            OpenAudioLogger.info("Starting and loading took " + Duration.between(boot, finish).toMillis() + "MS");

            OpenAudioMc.getInstance().postBoot();
        } catch (Exception e) {
            OpenAudioLogger.error(e, "A fatal error occurred while enabling OpenAudioMc. The plugin will now disable itself.");
            Bukkit.getServer().getPluginManager().disablePlugin(this);
        }
    }

    /**
     * save configuration and stop the plugin
     */
    @Override
    public void onDisable() {
        OpenAudioLogger.info("Shutting down");
        OpenAudioMc.getService(SpigotPlayerService.class).onDisable();
        OpenAudioMc.getService(PredictiveMediaService.class).onDisable();
        openAudioMc.disable();
        HandlerList.unregisterAll(this);
        OpenAudioLogger.info("Stopped OpenAudioMc. Goodbye.");
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
        return proxyModule.getMode() != OAClientMode.STAND_ALONE;
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
            OpenAudioLogger.warn("Using forced networking class " + forced.getName());
            return forced;
        }

        proxyModule.refresh();
        OpenAudioLogger.info("Using networking class " + proxyModule.getMode().getServiceClass().getName());
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
    public UserHooks getUserHooks() {
        return new SpigotUserHooks();
    }

}
