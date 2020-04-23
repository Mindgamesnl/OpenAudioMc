package com.craftmend.openaudiomc.bungee;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.commands.BungeeCommandModule;
import com.craftmend.openaudiomc.bungee.modules.configuration.BungeeConfigurationImplementation;
import com.craftmend.openaudiomc.bungee.modules.node.NodeManager;
import com.craftmend.openaudiomc.bungee.modules.player.PlayerManager;
import com.craftmend.openaudiomc.bungee.modules.scheduling.BungeeTaskProvider;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.interfaces.ITaskProvider;
import com.craftmend.openaudiomc.generic.core.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.states.IdleState;

import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import lombok.Getter;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.plugin.Plugin;

import java.time.Duration;
import java.time.Instant;

@Getter
public class OpenAudioMcBungee extends Plugin implements OpenAudioInvoker {

    /**
     * Constant: main plugin instance
     */
    @Getter private static OpenAudioMcBungee instance;

    /**
     * Managers
     */
    @Getter private NodeManager nodeManager;
    @Getter private PlayerManager playerManager;
    @Getter private BungeeCommandModule commandModule;
    private Instant boot = Instant.now();

    @Override
    public void onEnable() {

        instance = this;

        // setup core
        try {
            new OpenAudioMc(this);
            this.playerManager = new PlayerManager(this);
            this.commandModule = new BungeeCommandModule(this);
            this.nodeManager = new NodeManager(this);

            // set state to idle, to allow connections and such
            OpenAudioMc.getInstance().getStateService().setState(new IdleState("OpenAudioMc started and awaiting command"));

            // timing end and calc
            Instant finish = Instant.now();
            OpenAudioLogger.toConsole("Starting and loading took " + Duration.between(boot, finish).toMillis() + "MS");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * save configuration and stop the plugin
     */
    @Override
    public void onDisable() {
        OpenAudioMc.getInstance().disable();
    }

    @Override
    public boolean hasPlayersOnline() {
        return !ProxyServer.getInstance().getPlayers().isEmpty();
    }

    @Override
    public boolean isSlave() {
        return false;
    }

    @Override
    public Platform getPlatform() {
        return Platform.BUNGEE;
    }

    @Override
    public Class<? extends INetworkingService> getServiceClass() {
        return ClientMode.STAND_ALONE.getServiceClass();
    }

    @Override
    public ITaskProvider getTaskProvider() {
        return new BungeeTaskProvider();
    }

    @Override
    public ConfigurationImplementation getConfigurationProvider() {
        return new BungeeConfigurationImplementation();
    }

    @Override
    public void onPreBoot(OpenAudioMc openAudioMc) {

    }
}
