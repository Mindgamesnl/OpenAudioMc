package com.craftmend.openaudiomc;

import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.core.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.media.MediaModule;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.objects.OpenAudioApi;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.addapter.AbstractPacketAdapter;
import com.craftmend.openaudiomc.generic.plus.PlusService;
import com.craftmend.openaudiomc.generic.redis.RedisService;
import com.craftmend.openaudiomc.generic.redis.packets.adapter.RedisTypeAdapter;
import com.craftmend.openaudiomc.generic.core.interfaces.ITaskProvider;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.craftmend.openaudiomc.generic.voice.VoiceRoomManager;
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
     * - State Service           []   (responsible for tracking the current state)
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
    private final AuthenticationService authenticationService = new AuthenticationService();
    private final VoiceRoomManager voiceRoomManager = new VoiceRoomManager();
    private final StateService stateService = new StateService();
    private final TimeService timeService = new TimeService();
    private final MediaModule mediaModule = new MediaModule();
    private final NetworkingService networkingService;
    private final ConfigurationImplementation configurationImplementation;
    private final CommandModule commandModule;
    private final ITaskProvider taskProvider;
    private final RedisService redisService;
    private final PlusService plusService;
    private final Platform platform;
    private final OpenAudioInvoker invoker;
    private final boolean cleanStartup;
    private boolean isDisabled = false;
    private final Class<? extends NetworkingService> serviceImplementation;

    @Getter private static final OpenAudioApi api = new OpenAudioApi();
    @Getter private static OpenAudioMc instance;
    @Getter private static final Gson gson = new GsonBuilder()
            .registerTypeAdapter(AbstractPacketPayload.class, new AbstractPacketAdapter())
            .registerTypeAdapter(ShowRunnable.class, new RunnableTypeAdapter())
            .registerTypeAdapter(OARedisPacket.class, new RedisTypeAdapter())
            .create();

    public OpenAudioMc(OpenAudioInvoker invoker) throws Exception {
        instance = this;
        this.platform = invoker.getPlatform();
        this.serviceImplementation = invoker.getServiceClass();
        this.invoker = invoker;
        this.cleanStartup = !this.invoker.hasPlayersOnline();
        this.taskProvider = invoker.getTaskProvider();
        this.configurationImplementation = invoker.getConfigurationProvider();

        this.authenticationService.initialize();
        new MigrationWorker().handleMigrations(this);
        this.redisService = new RedisService(this.configurationImplementation);
        this.networkingService = serviceImplementation.getConstructor().newInstance();
        this.commandModule = new CommandModule();
        this.plusService = new PlusService(this);
    }

    public void disable() {
        isDisabled = true;
        this.plusService.shutdown();
        redisService.shutdown();
        configurationImplementation.saveAll();
        if (stateService.getCurrentState().isConnected()) {
            networkingService.stop();
        }
    }
}