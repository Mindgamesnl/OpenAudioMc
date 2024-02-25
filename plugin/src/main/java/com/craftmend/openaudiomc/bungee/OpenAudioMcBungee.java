package com.craftmend.openaudiomc.bungee;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.RegistryApiImpl;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.bungee.modules.commands.BungeeCommandModule;
import com.craftmend.openaudiomc.bungee.modules.configuration.BungeeConfiguration;
import com.craftmend.openaudiomc.bungee.modules.dependency.BungeeDependencyService;
import com.craftmend.openaudiomc.bungee.modules.platform.BungeeUserHooks;
import com.craftmend.openaudiomc.bungee.modules.player.listeners.PlayerConnectionListener;
import com.craftmend.openaudiomc.bungee.modules.scheduling.BungeeTaskService;
import com.craftmend.openaudiomc.generic.rd.RestDirectService;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.state.StateService;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.platform.interfaces.OpenAudioInvoker;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.OAClientMode;
import com.craftmend.openaudiomc.bungee.modules.punishments.LitebansIntegration;
import com.craftmend.openaudiomc.generic.proxy.messages.implementations.BungeeCordPacketManager;
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
    private final Instant boot = Instant.now();
    @Getter private BungeeCordPacketManager messageHandler;

    @Override
    public void onEnable() {
        instance = this;
        MagicValue.overWrite(MagicValue.STORAGE_DIRECTORY, getDataFolder());

        getProxy().getPluginManager().registerListener(this, new PlayerConnectionListener());

        // setup core
        try {
            OpenAudioMc openAudioMc = new OpenAudioMc(this);
            openAudioMc.getServiceManager().registerDependency(OpenAudioMcBungee.class, this);
            this.messageHandler = new BungeeCordPacketManager(this, "openaudiomc:node");

            openAudioMc.getServiceManager().loadServices(
                    BungeeDependencyService.class,
                    BungeeCommandModule.class
            );

            openAudioMc.getServiceManager().getService(BungeeDependencyService.class)
                    .ifPluginEnabled("LiteBans", new LitebansIntegration());

            OpenAudioMc.getService(RestDirectService.class).boot();

            // set state to idle, to allow connections and such
            OpenAudioMc.getService(StateService.class).setState(new IdleState("OpenAudioMc started and awaiting command"));

            // timing end and calc
            Instant finish = Instant.now();
            OpenAudioLogger.info("Starting and loading took " + Duration.between(boot, finish).toMillis() + "MS");
            OpenAudioMc.getInstance().postBoot();
        } catch (Exception e) {
            OpenAudioLogger.error(e, "Failed to boot OpenAudioMc, please report this stacktrace");
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
        Class<? extends NetworkingService> forced = ((RegistryApiImpl) AudioApi.getInstance().getRegistryApi()).getForcedService();
        if (forced != null) {
            return forced;
        }

        return OAClientMode.STAND_ALONE.getServiceClass();
    }

    @Override
    public TaskService getTaskProvider() {
        return new BungeeTaskService();
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
    public UserHooks getUserHooks() {
        return new BungeeUserHooks();
    }

}
