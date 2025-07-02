package com.craftmend.vistas.server;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.DefaultNetworkingService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.vistas.client.redis.packets.AnnounceSelfRequest;
import com.craftmend.openaudiomc.vistas.client.server.networking.VistasRedisServer;
import com.craftmend.openaudiomc.vistas.client.users.ServerUserHooks;
import com.craftmend.vistas.server.base.VistasConfiguration;
import com.craftmend.vistas.server.base.VistasScheduler;
import com.craftmend.vistas.server.util.Waiter;
import lombok.Getter;
import lombok.SneakyThrows;

import java.io.File;
import java.util.UUID;

public final class VistasServer implements OpenAudioInvoker {

    @Getter static VistasServer instance;
    @Getter private final UUID sessionId = UUID.randomUUID();
    @Getter private OpenAudioMc openAudioMc;

    public VistasServer() {
        instance = this;
        File basePath = new File(VistasConfiguration.BASE_PATH);
        if (!basePath.exists()) {
            OpenAudioLogger.info("Creating base path");
            basePath.mkdir();
        }
    }

    @SneakyThrows
    public void onEnable() {
        openAudioMc = new OpenAudioMc(this);
        openAudioMc.postBoot();

        // register network shit
        openAudioMc.getServiceManager().loadServices(VistasRedisServer.class);

        // inject server bullshit
        OpenAudioMc.getService(StateService.class).setState(new IdleState("OpenAudioMc started and awaiting command"));

        // wait for openaudio to boot
        Waiter.waitUntil(unused -> OpenAudioMc.getService(OpenaudioAccountService.class).isInitialized(), 20);

        // we're setup!
        MagicValue.overWrite(MagicValue.NOTIFY_VOICECHAT_SLOT_DEPLETION, false);

        OpenAudioMc.resolveDependency(ServerUserHooks.class).startGc();

        openAudioMc.getServiceManager().getService(VistasRedisServer.class).sendPacket(new AnnounceSelfRequest(), null);
    }

    @Override
    public boolean hasPlayersOnline() {
        return false;
    }

    @Override
    public boolean isNodeServer() {
        return false;
    }

    @Override
    public Platform getPlatform() {
        return Platform.STANDALONE;
    }

    @Override
    public Class<? extends NetworkingService> getServiceClass() {
        return DefaultNetworkingService.class;
    }

    @Override
    public TaskService getTaskProvider() {
        return new VistasScheduler();
    }

    @Override
    public Configuration getConfigurationProvider() {
        Configuration configuration = new VistasConfiguration();
        configuration.setBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY, true);
        configuration.setBoolean(StorageKey.DEBUG_LOG_STATE_CHANGES, true);
        configuration.setBoolean(StorageKey.SETTINGS_SEND_URL_ON_JOIN, true);
        return configuration;
    }

    @Override
    public String getPluginVersion() {
        return "vistas-latest";
    }

    @Override
    public int getServerPort() {
        return 25565;
    }

    @Override
    public UserHooks getUserHooks() {
        return new ServerUserHooks();
    }
}
