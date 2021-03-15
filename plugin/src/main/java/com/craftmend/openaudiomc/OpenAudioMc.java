package com.craftmend.openaudiomc;

import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.networking.rest.ServerEnvironment;
import com.craftmend.openaudiomc.generic.platform.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.storage.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.media.MediaModule;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.objects.OpenAudioApi;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.addapter.AbstractPacketAdapter;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.redis.RedisService;
import com.craftmend.openaudiomc.generic.redis.packets.adapter.RedisTypeAdapter;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskProvider;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.craftmend.openaudiomc.generic.enviroment.GlobalConstantService;
import com.craftmend.openaudiomc.generic.state.StateService;

import com.craftmend.openaudiomc.spigot.modules.show.adapter.RunnableTypeAdapter;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.Getter;

@Getter
public class OpenAudioMc {

    /*
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
     *
     * Services used by the core to run OpenAudioMc
     *           (SERVICE)                            (PURPOSE)
     * ===========================================================================
     * - Event Driver            []   (Cross platform event driver used in the Api and internally)
     * - State Service           []   (responsible for tracking the current state)
     * - Time Service            []   (used to synchronize time with the central OpenAudioMc-time-server)
     * - Networking Service      []   (handles connections, clients, packets etc)
     * - Configuration Interface []   (storage implementation for the platform type)
     * - Authentication Service  []   (handle authentication for the api)
     * - Voice Room Manager      []   (keep track of ongoing voice calls)
     * - Command Module          []   (common framework to keep all commands as common-code regardless of platform)
     * - PMM                     []   (Predictive media module attempts to predict what sounds are likely to play)
     * - Media Module            []   (keep track of media and timings)
     * - Task Provider           []   (create and register tasks regardless of platform)
     * - Redis Service           []   (provides redis to openaudio and the gang)
     * - Plus Service            []   (Manages everything OpenAudioMc-Plus related, from auth to upstream data)
     * - Update Service          []   (Checks the master branch every once in a while to compare versions)
     * - Voice Service           []   (Service handling OpenAudioMc's voice chat routing and servers)
     */
    private final ApiEventDriver apiEventDriver = new ApiEventDriver();
    private final AuthenticationService authenticationService;
    private final StateService stateService = new StateService();
    private final TimeService timeService = new TimeService();
    private final MediaModule mediaModule = new MediaModule();
    private final GlobalConstantService globalConstantService;
    private final NetworkingService networkingService;
    private final ConfigurationImplementation configuration;
    private final CommandModule commandModule;
    private final TaskProvider taskProvider;
    private final RedisService redisService;
    private final CraftmendService craftmendService;
    private final Platform platform;
    private final OpenAudioInvoker invoker;
    private final boolean cleanStartup;
    private boolean isDisabled = false;
    private final Class<? extends NetworkingService> serviceImplementation;

    @Deprecated @Getter private static final OpenAudioApi api = new OpenAudioApi();
    public static ServerEnvironment SERVER_ENVIRONMENT = ServerEnvironment.PRODUCTION;
    @Getter private static OpenAudioMc instance;
    @Getter private static final Gson gson = new GsonBuilder()
            .registerTypeAdapter(AbstractPacketPayload.class, new AbstractPacketAdapter())
            .registerTypeAdapter(ShowRunnable.class, new RunnableTypeAdapter())
            .registerTypeAdapter(OARedisPacket.class, new RedisTypeAdapter())
            .create();

    public OpenAudioMc(OpenAudioInvoker invoker) throws Exception {
        // very first thing we need to do, is set the environment
        String env = System.getenv("OA_ENVIRONMENT");
        if (env != null && env != "") {
            SERVER_ENVIRONMENT = ServerEnvironment.valueOf(env);
            OpenAudioLogger.toConsole("WARNING! STARTING IN " + env + " MODE!");
        }

        instance = this;
        this.invoker = invoker;
        this.platform = invoker.getPlatform();
        this.authenticationService = new AuthenticationService();
        this.taskProvider = invoker.getTaskProvider();
        this.serviceImplementation = invoker.getServiceClass();
        this.cleanStartup = !this.invoker.hasPlayersOnline();
        this.configuration = invoker.getConfigurationProvider();
        this.authenticationService.initialize();
        globalConstantService = new GlobalConstantService();

        new MigrationWorker().handleMigrations();

        this.commandModule = new CommandModule(this);
        this.redisService = new RedisService(this.configuration);
        this.networkingService = serviceImplementation.getConstructor().newInstance();
        this.craftmendService = new CraftmendService(this, invoker.getVoiceService());

        // run later
        taskProvider.schduleSyncDelayedTask(authenticationService::prepareId, 20 * 2);
    }

    public void disable() {
        isDisabled = true;
        configuration.saveAll();
        try {
            this.craftmendService.shutdown();
            redisService.shutdown();
            if (stateService.getCurrentState().isConnected()) {
                networkingService.stop();
            }
        } catch (NoClassDefFoundError exception) {
            OpenAudioLogger.toConsole("Bukkit already unloaded the OA+ classes, can't kill tokens.");
        }
    }
}