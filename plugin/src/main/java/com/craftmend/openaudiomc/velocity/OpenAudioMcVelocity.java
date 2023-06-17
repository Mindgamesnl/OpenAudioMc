package com.craftmend.openaudiomc.velocity;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.rd.RestDirectService;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.OAClientMode;
import com.craftmend.openaudiomc.generic.proxy.messages.implementations.VelocityPacketManager;
import com.craftmend.openaudiomc.velocity.modules.commands.VelocityCommandModule;
import com.craftmend.openaudiomc.velocity.modules.configuration.VelocityConfiguration;
import com.craftmend.openaudiomc.velocity.modules.player.listeners.PlayerConnectionListener;
import com.craftmend.openaudiomc.velocity.modules.scheduling.VelocityTaskService;
import com.craftmend.openaudiomc.velocity.platform.CommandPacketListener;
import com.craftmend.openaudiomc.velocity.platform.VelocityUserHooks;
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
        version = "6.8.5",
        authors = {"Mindgamesnl", "fluse1367"},
        description = "OpenAudioMc: Proximity voice chat & audio plugin for Minecraft, no mods needed. Supports Bungeecord, Velocity, Spigot & more.",
        url = "https://openaudiomc.net/"
)
public class OpenAudioMcVelocity implements OpenAudioInvoker {

    @Getter private static OpenAudioMcVelocity instance;
    @Getter private final ProxyServer server;
    @Getter private final File dataDir;
    private final Instant boot = Instant.now();
    @Getter private VelocityCommandModule commandModule;
    @Getter private VelocityPacketManager messageReceiver;

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
        MagicValue.overWrite(MagicValue.STORAGE_DIRECTORY, this.dataDir);

        // setup core
        try {
            new OpenAudioMc(this);
            getServer().getEventManager().register(this, new PlayerConnectionListener());
            this.commandModule = new VelocityCommandModule(this);
            this.messageReceiver = new VelocityPacketManager(this, getServer(),"openaudiomc:node");

            OpenAudioMc.getService(RestDirectService.class).boot();

            // set state to idle, to allow connections and such
            OpenAudioMc.getService(StateService.class).setState(new IdleState("OpenAudioMc started and awaiting command"));

            // timing end and calc
            Instant finish = Instant.now();
            OpenAudioLogger.toConsole("Starting and loading took " + Duration.between(boot, finish).toMillis() + "MS");

            this.messageReceiver.registerListener(new CommandPacketListener());

            OpenAudioMc.getInstance().postBoot();
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
        return OAClientMode.STAND_ALONE.getServiceClass();
    }

    @Override
    public TaskService getTaskProvider() {
        return new VelocityTaskService();
    }

    @Override
    public Configuration getConfigurationProvider() {
        return new VelocityConfiguration();
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
    public UserHooks getUserHooks() {
        return new VelocityUserHooks(this);
    }

}
