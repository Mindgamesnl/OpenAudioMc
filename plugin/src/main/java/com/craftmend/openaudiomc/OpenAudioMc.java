package com.craftmend.openaudiomc;

import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.core.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.media.MediaModule;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.migrations.MigrationWorker;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingService;
import com.craftmend.openaudiomc.generic.networking.rest.adapters.RegistrationResponseAdapter;
import com.craftmend.openaudiomc.generic.networking.rest.responses.RegistrationResponse;
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
    private TimeService timeService;
    private INetworkingService networkingService;
    private ConfigurationImplementation configurationImplementation;
    private AuthenticationService authenticationService;
    private VoiceRoomManager voiceRoomManager;
    private CommandModule commandModule;
    private MediaModule mediaModule;
    private ITaskProvider taskProvider;
    private RedisService redisService;
    private PlusService plusService;

    private Platform platform;
    private OpenAudioInvoker invoker;
    private boolean cleanStartup;
    private boolean isDisabled = false;
    private Class<? extends INetworkingService> serviceImplementation;

    @Getter private static final OpenAudioApi api = new OpenAudioApi();
    @Getter private static OpenAudioMc instance;
    @Getter private static final Gson gson = new GsonBuilder()
            .registerTypeAdapter(AbstractPacketPayload.class, new AbstractPacketAdapter())
            .registerTypeAdapter(ShowRunnable.class, new RunnableTypeAdapter())
            .registerTypeAdapter(RegistrationResponse.class, new RegistrationResponseAdapter())
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

        this.invoker.onPreBoot(this);

        this.authenticationService = new AuthenticationService();
        this.authenticationService.initialize();

        // do migration
        new MigrationWorker().handleMigrations(this);

        // only enable redis if there are packets that require it for this platform
        this.redisService = new RedisService(this.configurationImplementation);
        this.stateService = new StateService();
        this.timeService = new TimeService();
        this.mediaModule = new MediaModule();
        this.networkingService = serviceImplementation.getConstructor().newInstance();
        this.voiceRoomManager = new VoiceRoomManager(this);
        this.commandModule = new CommandModule();
        this.plusService = new PlusService(this);
    }

    public void disable() {
        isDisabled = true;
        redisService.shutdown();
        configurationImplementation.saveAll();
        this.plusService.shutdown();
        if (stateService.getCurrentState().isConnected()) {
            networkingService.stop();
        }
    }
}