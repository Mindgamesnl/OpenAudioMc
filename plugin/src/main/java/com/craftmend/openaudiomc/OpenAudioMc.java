package com.craftmend.openaudiomc;

import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.networking.rest.ServerEnvironment;
import com.craftmend.openaudiomc.generic.platform.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.resources.ResourceService;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.service.ServiceManager;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.objects.OpenAudioApi;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.redis.RedisService;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.enviroment.GlobalConstantService;
import com.craftmend.openaudiomc.generic.state.StateService;

import com.craftmend.openaudiomc.generic.utils.data.GsonFactory;

import com.craftmend.openaudiomc.generic.voicechat.VoiceService;
import com.google.gson.Gson;
import lombok.Getter;

@Getter
public class OpenAudioMc {

    private ServiceManager serviceManager = new ServiceManager();

    private final ApiEventDriver apiEventDriver = new ApiEventDriver();
    private final Configuration configuration;
    private final Platform platform;
    private final OpenAudioInvoker invoker;
    private final boolean cleanStartup;
    private boolean isDisabled = false;

    @Deprecated @Getter private static final OpenAudioApi api = new OpenAudioApi();
    public static ServerEnvironment SERVER_ENVIRONMENT = ServerEnvironment.PRODUCTION;
    @Getter private static OpenAudioMc instance;
    public static final OpenAudioMcBuild BUILD = new OpenAudioMcBuild();

    @Getter private static final Gson gson = GsonFactory.create();

    public OpenAudioMc(OpenAudioInvoker invoker) throws Exception {
        // very first thing we need to do, is set the environment
        String env = System.getenv("OA_ENVIRONMENT");
        if (env != null && env != "") {
            SERVER_ENVIRONMENT = ServerEnvironment.valueOf(env);
            OpenAudioLogger.toConsole("WARNING! STARTING IN " + env + " MODE!");
        }

        instance = this;

        OpenAudioLogger.toConsole("Initializing build " + BUILD.getBuildNumber() + " by " + BUILD.getBuildAuthor());

        this.invoker = invoker;
        this.platform = invoker.getPlatform();

        // register providers
        serviceManager.registerDependency(Configuration.class, invoker.getConfigurationProvider());
        serviceManager.registerDependency(VoiceService.class, invoker.getVoiceService());
        serviceManager.registerDependency(TaskService.class, invoker.getTaskProvider());

        // constants
        this.cleanStartup = !this.invoker.hasPlayersOnline();
        this.configuration = invoker.getConfigurationProvider();
        new MigrationWorker().handleMigrations();

        // load networking service
        serviceManager.registerDependency(NetworkingService.class, invoker.getServiceClass().getConstructor().newInstance());

        // load services
        serviceManager.loadServices(
                MediaService.class,
                TimeService.class,
                ResourceService.class,
                StateService.class,
                AuthenticationService.class,
                GlobalConstantService.class,
                CommandService.class,
                RedisService.class,
                CraftmendService.class
        );
    }

    public static <T extends Service> T getService(Class<T> service) {
        return service.cast(OpenAudioMc.getInstance().getServiceManager().loadService(service));
    }

    public static <T> T resolveDependency(Class<T> d) {
        return d.cast(OpenAudioMc.getInstance().getServiceManager().resolve(d));
    }

    public void disable() {
        isDisabled = true;
        configuration.saveAll();

        serviceManager.getService(ResourceService.class).saveData();

        try {
            serviceManager.getService(CraftmendService.class).shutdown();
            serviceManager.getService(RedisService.class).shutdown();
            if (serviceManager.getService(StateService.class).getCurrentState().isConnected()) {
                serviceManager.getService(NetworkingService.class).stop();
            }
        } catch (NoClassDefFoundError exception) {
            OpenAudioLogger.toConsole("Bukkit already unloaded the OA+ classes, can't kill tokens.");
        }
    }
}
