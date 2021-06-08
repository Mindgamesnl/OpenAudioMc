package com.craftmend.openaudiomc.bungee;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.commands.BungeeCommandModule;
import com.craftmend.openaudiomc.bungee.modules.configuration.BungeeConfiguration;
import com.craftmend.openaudiomc.bungee.modules.node.NodeManager;
import com.craftmend.openaudiomc.bungee.modules.player.PlayerManager;
import com.craftmend.openaudiomc.bungee.modules.scheduling.BungeeTaskProvider;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskProvider;
import com.craftmend.openaudiomc.generic.platform.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.craftmend.openaudiomc.generic.voicechat.DefaultVoiceServiceImpl;
import com.craftmend.openaudiomc.generic.voicechat.VoiceService;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import lombok.Getter;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.config.ListenerInfo;
import net.md_5.bungee.api.plugin.Plugin;

import java.time.Duration;
import java.time.Instant;

@Getter
public class OpenAudioMcBungee extends Plugin implements OpenAudioInvoker {

    /**
     * The OpenAudioMc bungeecord plugin is pretty barebones and minimal.
     * all exciting stuff and services are still being handles on the sub servers
     * (most features require locational awareness in some form or another, so implementing them here
     * doesn't make any sense)
     *
     * The bungee plugin is really important though, its tasked with
     *  - Synchronizing player sessions over the network
     *  - Combining datastreams from all sub servers in one chunky event bus
     *  - tying all services together and running it as one openaudiomc installation/account
     *  - forwarding state data and service context
     */

    @Getter private static OpenAudioMcBungee instance;
    @Getter private NodeManager nodeManager;
    @Getter private PlayerManager playerManager;
    @Getter private BungeeCommandModule commandModule;
    private final Instant boot = Instant.now();

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
    public boolean isNodeServer() {
        return false;
    }

    @Override
    public Platform getPlatform() {
        return Platform.BUNGEE;
    }

    @Override
    public Class<? extends NetworkingService> getServiceClass() {
        return ClientMode.STAND_ALONE.getServiceClass();
    }

    @Override
    public TaskProvider getTaskProvider() {
        return new BungeeTaskProvider();
    }

    @Override
    public Configuration getConfigurationProvider() {
        return new BungeeConfiguration();
    }

    @Override
    public String getPluginVersion() {
        return getDescription().getVersion();
    }

    @Override
    public int getServerPort() {
        // find 25565
        for (ListenerInfo listener : ProxyServer.getInstance().getConfig().getListeners()) {
            if (listener.getHost().getPort() == 25565) {
                return 25565;
            }
        }

        // nothing? then the first one
        for (ListenerInfo listener : ProxyServer.getInstance().getConfig().getListeners()) {
            return listener.getHost().getPort();
        }
        return -1;
    }

    @Override
    public VoiceService getVoiceService() {
        return new DefaultVoiceServiceImpl();
    }

}
