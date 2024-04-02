package com.craftmend.openaudiomc;

import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.generic.api.ApiService;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.backups.BackupService;
import com.craftmend.openaudiomc.generic.client.ClientDataService;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.environment.EnvironmentService;
import com.craftmend.openaudiomc.generic.environment.GlobalConstantService;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.events.EventService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.modules.ModuleLoaderService;
import com.craftmend.openaudiomc.generic.mojang.MojangLookupService;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.payloads.client.interfaces.SourceHolder;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.proxy.ProxyHostService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.rd.RestDirectService;
import com.craftmend.openaudiomc.generic.redis.RedisService;
import com.craftmend.openaudiomc.generic.resources.RuntimeDependencyService;
import com.craftmend.openaudiomc.generic.rest.ServerEnvironment;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.service.ServiceManager;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.uploads.UploadIndexService;
import com.craftmend.openaudiomc.generic.utils.data.GsonFactory;
import com.google.gson.Gson;
import lombok.Getter;

@Getter
public class OpenAudioMc {

    private final ServiceManager serviceManager = new ServiceManager();

    /**
     * Alright, so.
     * The main class is pretty empty, it doesn't do too much, actually.
     * OpenAudioMc is divided into "services", with additional classes being loaded depending
     * on the runtime environment and available libraries (like spigot, bungee, velocity, worldguard, etc etc)
     * <p>
     * The only thing this "main" class really does is collect some information about the operating
     * environment and initialize the "core" services one by one. These services are injected into others, or can
     * be requested through the instance getter.
     * <p>
     * These are some core variables we need to keep track of, regardless of service
     */
    private final ApiEventDriver apiEventDriver = new ApiEventDriver();
    private final Configuration configuration;
    private final Platform platform;
    private final OpenAudioInvoker invoker;
    private final boolean cleanStartup;
    @Getter
    private boolean isDisabled = false;

    /**
     * Legacy and static instances (API, ENV, instance, build number and gson along with its type adapters)
     */
    public static ServerEnvironment SERVER_ENVIRONMENT = ServerEnvironment.PRODUCTION;
    @Getter
    private static OpenAudioMc instance;
    public static final OpenAudioMcBuild BUILD = new OpenAudioMcBuild();

    @Getter
    private static final Gson gson = GsonFactory.create();

    /**
     * Alright, lets get this show on the road.
     *
     * @param invoker Invoker environment description
     * @throws Exception Yes, when you dropped me, and I hit the floor, I caught the sads.
     *                   Which in turn, has made me sad.
     *                   These stacktraces you see, are my tears..
     *                   For I am sad...
     *                   I will never forgive you, for everything you've done.
     */
    public OpenAudioMc(OpenAudioInvoker invoker) throws Exception {
        // very first thing we need to do, is set the environment, since we might want to log extra data
        // on development servers, and disable debugging commands on production.
        String env = MagicValue.readEnv("OA_ENVIRONMENT");
        MagicValue.loadArguments();
        if (env != null && !env.equals("")) {
            SERVER_ENVIRONMENT = ServerEnvironment.valueOf(env);
            OpenAudioLogger.info("WARNING! STARTING IN " + env + " MODE!");
        }

        // random bullshit, go!
        instance = this;
        OpenAudioLogger.info("Starting OpenAudioMc, build " + BUILD.getBuildNumber() + " by " + BUILD.getBuildAuthor());

        // load core internal API's which are heavily used by the rest of the plugin
        serviceManager.loadServices(
                RuntimeDependencyService.class,
                EventService.class             // platform agnostic event manager
        );

        // setup
        this.invoker = invoker;
        this.platform = invoker.getPlatform(); // constants
        this.cleanStartup = !this.invoker.hasPlayersOnline();
        this.configuration = invoker.getConfigurationProvider();

        // register providers
        // these are classes that might not be services (interfaces, or abstract) but
        // we want to use through dependency injection anyway
        serviceManager.registerDependency(Configuration.class, invoker.getConfigurationProvider());
        serviceManager.registerDependency(TaskService.class, invoker.getTaskProvider());

        // check if its overwritten by the api
        if (!MagicValue.FORCED_HOOK_INJECTION.isNull()) {
            serviceManager.registerDependency(UserHooks.class, MagicValue.FORCED_HOOK_INJECTION.get(UserHooks.class));
        } else {
            serviceManager.registerDependency(UserHooks.class, invoker.getUserHooks());
        }

        // register backup service
        serviceManager.loadService(
                BackupService.class              // handles backups
        );

        // migrate old config and data files between versions
        new MigrationWorker().handleMigrations();

        // handle modules
        serviceManager.loadService(
                ModuleLoaderService.class      // download, save and use external jar modules
        );

        // load networking service, its a variable class (between platform) that we want to inject and
        // identify based on its abstract class name, meaning that injected code can be re-used regardless of platform
        serviceManager.registerDependency(NetworkingService.class, invoker.getServiceClass().getConstructor().newInstance());

        // load core services in order
        serviceManager.loadServices(
                DatabaseService.class,          // player and profile storage
                EnvironmentService.class,       // env loader
                MojangLookupService.class,      // handles caching of uuid's > names
                ProxyHostService.class,         // register handlers for proxy events
                MediaService.class,             // processes outgoing URL's
                TimeService.class,              // processes remote or network timecodes and translates them for the client
                StateService.class,             // handles internal state tracking/monitoring
                AuthenticationService.class,    // handles server key sets with the OpenAudioMc backend infrastructure
                GlobalConstantService.class,    // keeps track of remote project constants (like release versions, etc)
                CommandService.class,           // standardized command processor regardless of platform
                RedisService.class,             // redis hook/service implementation
                OpenaudioAccountService.class,  // platform specific features, like voice chat
                RestDirectService.class,        // manage rest direct
                ClientDataService.class,        // manage player profiles
                ApiService.class,               // initialize api implementations
                UploadIndexService.class        // track uploaded content
        );

        getService(ModuleLoaderService.class).fire(ModuleEvent.SERVICES_LOADED);
    }

    public void postBoot() {
        getService(OpenaudioAccountService.class).postBoot();
        getService(ModuleLoaderService.class).fire(ModuleEvent.PLATFORM_LOADED);
    }

    // simple shutdown logic
    public void disable() {
        isDisabled = true;
        configuration.saveAll(false);

        serviceManager.getService(ModuleLoaderService.class).fire(ModuleEvent.SHUTDOWN);

        try {
            if (serviceManager.getService(StateService.class).getCurrentState().isConnected()) {
                serviceManager.getService(NetworkingService.class).stop();
            }
            serviceManager.getService(OpenaudioAccountService.class).shutdown();
            serviceManager.getService(RedisService.class).shutdown();
        } catch (NoClassDefFoundError exception) {
            OpenAudioLogger.warn("Core dependencies were already unloaded by the classloader, skipping shutdown");
        }
    }

    // easy shorthand getters
    public static <T extends Service> T getService(Class<T> service) {
        return service.cast(OpenAudioMc.getInstance().getServiceManager().loadService(service));
    }

    public static <T> T resolveDependency(Class<T> d) {
        return d.cast(OpenAudioMc.getInstance().getServiceManager().resolve(d));
    }
}
