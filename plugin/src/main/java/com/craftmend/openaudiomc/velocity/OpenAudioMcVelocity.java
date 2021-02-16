package com.craftmend.openaudiomc.velocity;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskProvider;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.craftmend.openaudiomc.generic.storage.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.voicechat.DefaultVoiceServiceImpl;
import com.craftmend.openaudiomc.generic.voicechat.VoiceService;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import com.craftmend.openaudiomc.velocity.modules.commands.VelocityCommandModule;
import com.craftmend.openaudiomc.velocity.modules.configuration.VelocityConfigurationImplementation;
import com.craftmend.openaudiomc.velocity.modules.node.NodeManager;
import com.craftmend.openaudiomc.velocity.modules.player.PlayerManager;
import com.craftmend.openaudiomc.velocity.modules.scheduling.VelocityTaskProvider;
import com.google.inject.Inject;
import com.velocitypowered.api.event.Subscribe;
import com.velocitypowered.api.event.proxy.ProxyInitializeEvent;
import com.velocitypowered.api.event.proxy.ProxyShutdownEvent;
import com.velocitypowered.api.plugin.Plugin;
import com.velocitypowered.api.plugin.annotation.DataDirectory;
import com.velocitypowered.api.proxy.ProxyServer;
import lombok.Getter;

import java.io.File;
import java.nio.file.Path;
import java.time.Duration;
import java.time.Instant;

@Plugin(
        id = "openaudiomc",
        name = "OpenAudioMc Bungee Plugin Port for Velocity",
        version = "6.5",
        authors = {"Mindgamesnl", "fluse1367"},
        description = "The OpenAudioMc plugin. Brings real sound and lights to your minecraft server with the help of a custom web client. Velocity plugin port by fluse1367.",
        url = "https://openaudiomc.net/"
)
public class OpenAudioMcVelocity implements OpenAudioInvoker {

    @Getter
    private static OpenAudioMcVelocity instance;
    @Getter
    private final ProxyServer server;
    @Getter
    private final File dataDir;
    private final Instant boot = Instant.now();
    @Getter
    private NodeManager nodeManager;
    @Getter
    private PlayerManager playerManager;
    @Getter
    private VelocityCommandModule commandModule;

    @Inject
    public OpenAudioMcVelocity(ProxyServer server, @DataDirectory Path dataDirPath) {
        this.server = server;
        this.dataDir = dataDirPath.toFile();

        if (!dataDir.exists() && !dataDir.mkdirs()) {
            throw new RuntimeException("Could not create data directory (" + dataDir + ")!");
        }
    }

    @Subscribe
    public void onProxyInit(ProxyInitializeEvent e) {
        instance = this;

        // setup core
        try {
            new OpenAudioMc(this);
            this.playerManager = new PlayerManager(this);
            this.commandModule = new VelocityCommandModule(this);
            this.nodeManager = new NodeManager(this);

            // set state to idle, to allow connections and such
            OpenAudioMc.getInstance().getStateService().setState(new IdleState("OpenAudioMc started and awaiting command"));

            // timing end and calc
            Instant finish = Instant.now();
            OpenAudioLogger.toConsole("Starting and loading took " + Duration.between(boot, finish).toMillis() + "MS");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Subscribe
    public void onProxyShutdown(ProxyShutdownEvent e) {
        OpenAudioMc.getInstance().disable();
    }

    @Override
    public boolean hasPlayersOnline() {
        return !server.getAllPlayers().isEmpty();
    }

    @Override
    public boolean isNodeServer() {
        return false;
    }

    @Override
    public Platform getPlatform() {
        return Platform.VELOCITY;
    }

    @Override
    public Class<? extends NetworkingService> getServiceClass() {
        return ClientMode.STAND_ALONE.getServiceClass();
    }

    @Override
    public TaskProvider getTaskProvider() {
        return new VelocityTaskProvider();
    }

    @Override
    public ConfigurationImplementation getConfigurationProvider() {
        return new VelocityConfigurationImplementation();
    }

    @Override
    public String getPluginVersion() {
        return server.getPluginManager().getPlugin("openaudiomc").orElseThrow(
                () -> new Error("OpenAudioMc Velcoity plugin not found!"))
                .getDescription().getVersion().orElse("null");
    }

    @Override
    public int getServerPort() {
        return server.getBoundAddress().getPort();
    }

    @Override
    public VoiceService getVoiceService() {
        return new DefaultVoiceServiceImpl();
    }

}
