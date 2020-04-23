package com.craftmend.openaudiomc;

import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.core.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.media.MediaModule;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.objects.OpenAudioApi;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.addapter.AbstractPacketAdapter;
import com.craftmend.openaudiomc.generic.plus.PlusService;
import com.craftmend.openaudiomc.generic.redis.RedisService;
import com.craftmend.openaudiomc.generic.redis.packets.channels.ChannelKey;
import com.craftmend.openaudiomc.generic.core.ITaskProvider;
import com.craftmend.openaudiomc.generic.voice.VoiceRoomManager;
import com.craftmend.openaudiomc.generic.state.StateService;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.configuration.SpigotConfigurationImplementationModule;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import com.craftmend.openaudiomc.spigot.modules.show.adapter.RunnableTypeAdapter;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import com.craftmend.openaudiomc.spigot.services.scheduling.SpigotTaskProvider;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;

import com.craftmend.openaudiomc.bungee.modules.configuration.BungeeConfigurationImplementationModule;
import com.craftmend.openaudiomc.bungee.modules.scheduling.BungeeTaskProvider;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.Getter;

import java.util.Arrays;

@Getter
public class OpenAudioMc {

    /*
     *  -- NOTE --
     *
     * This is not the plugin of OpenAudioMc, this is the core.
     * For the plugin, see /bungee and the /spigot packages.
     * The core manages all the services used to run OpenAudioMc clients of all types.
     * The core is not version or platform dependant, as long as it runs java.
     *
     * The core is initialized by the plugin (bungeecord or spigot) and only needs a flag
     * to know what platform it is running of.
     *
     * This is always where the magic will happen, since this pretty much handles everything
     * including framework stuff.
     */

    /**
     * Services used by the core to run OpenAudioMc
     * <p>
     *           (SERVICE)                            (PURPOSE)
     * ===========================================================================
     * - State Service           []   (responsible for tracking the current state)
     * - Server Service          []   (used to probe and detect what it is running)
     * - Time Service            []   (used to synchronize time with the central OpenAudioMc-time-server)
     * - Networking Service      []   (handles connections, clients, packets etc)
     * - Configuration Interface []   (storage implementation for the platform type)
     * - Authentication Service  []   (handle authentication for the api)
     * - Voice Room Manager      []   (keep track of ongoing voice calls)
     * - Command Module          []   (common framework to keep all commands as common-code regardless of platform)
     * - Media Module            []   (keep track of media and timings)
     * - Task Provider           []   (create and register tasks regardless of platform)
     * - Redis Service           []   (provides redis to openaudio and the gang)
     * - Plus Service            []   (Manages everything OpenAudioMc-Plus related, from auth to upstream data)
     */
    private StateService stateService;
    private ServerService serverService;
    private TimeService timeService;
    private INetworkingService networkingService;
    private ConfigurationImplementation ConfigurationImplementation;
    private AuthenticationService authenticationService;
    private VoiceRoomManager voiceRoomManager;
    private CommandModule commandModule;
    private MediaModule mediaModule;
    private ITaskProvider taskProvider;
    private RedisService redisService;
    private PlusService plusService;

    @Getter private static OpenAudioMc instance;

    @Getter OpenAudioInvoker invoker;
    @Getter private boolean cleanStartup;
    @Getter private boolean isDisabled = false;
    @Getter private static final OpenAudioApi api = new OpenAudioApi();
    @Getter private Class<? extends INetworkingService> serviceImplementation;
    @Getter private static final Gson gson = new GsonBuilder()
            .registerTypeAdapter(AbstractPacketPayload.class, new AbstractPacketAdapter())
            .registerTypeAdapter(ShowRunnable.class, new RunnableTypeAdapter())
            .create();

    // The platform, easy for detecting what should be enabled and what not ya know
    private Platform platform;

    public OpenAudioMc(Platform platform, OpenAudioInvoker invoker, Class<? extends INetworkingService> networkingService) throws Exception {
        instance = this;
        this.platform = platform;
        this.serviceImplementation = networkingService;
        this.invoker = invoker;
        this.cleanStartup = !this.invoker.hasPlayersOnline();

        // if spigot, load the spigot configuration system and the bungee one for bungee
        if (platform == Platform.SPIGOT) {
            this.serverService = new ServerService();
            this.ConfigurationImplementation = new SpigotConfigurationImplementationModule(OpenAudioMcSpigot.getInstance());
            this.ConfigurationImplementation.loadSettings();
            this.taskProvider = new SpigotTaskProvider();
        } else {
            this.ConfigurationImplementation = new BungeeConfigurationImplementationModule();
            this.ConfigurationImplementation.loadSettings();
            this.taskProvider = new BungeeTaskProvider();
        }

        // only enable redis if there are packets that require it for this platform
        if (Arrays.stream(ChannelKey.values()).anyMatch(value -> value.getTargetPlatform() == platform)) {
            this.redisService = new RedisService(this.ConfigurationImplementation);
        }

        this.authenticationService = new AuthenticationService();

        // do migration
        new MigrationWorker().handleMigrations(this);

        this.stateService = new StateService();
        this.timeService = new TimeService();
        this.mediaModule = new MediaModule();
        this.networkingService = serviceImplementation.getConstructor().newInstance();
        this.voiceRoomManager = new VoiceRoomManager(this);
        this.commandModule = new CommandModule();
        this.plusService = new PlusService(this);
    }

    public boolean isSlave() {
        if (platform == Platform.BUNGEE) return false;
        return OpenAudioMcSpigot.getInstance().getProxyModule().getMode() != ClientMode.STAND_ALONE;
    }

    public void disable() {
        isDisabled = true;
        if (redisService != null) redisService.shutdown();
        ConfigurationImplementation.saveAll();
        this.plusService.shutdown();
        if (stateService.getCurrentState().isConnected()) {
            networkingService.stop();
        }
    }
}