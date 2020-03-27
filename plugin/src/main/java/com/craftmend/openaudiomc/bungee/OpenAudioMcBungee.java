package com.craftmend.openaudiomc.bungee;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.commands.BungeeCommandModule;
import com.craftmend.openaudiomc.bungee.modules.node.NodeManager;
import com.craftmend.openaudiomc.bungee.modules.player.PlayerManager;
import com.craftmend.openaudiomc.generic.loggin.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.state.states.IdleState;

import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import lombok.Getter;
import net.md_5.bungee.api.plugin.Plugin;

import java.time.Duration;
import java.time.Instant;

@Getter
public class OpenAudioMcBungee extends Plugin {

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

    @Override
    public void onEnable() {
        // Timing
        Instant boot = Instant.now();

        instance = this;

        // setup core
        try {
            new OpenAudioMc(Platform.BUNGEE, ClientMode.STAND_ALONE.serviceClass);
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

        // load managers and shit
        this.playerManager = new PlayerManager(this);
        this.commandModule = new BungeeCommandModule(this);
        this.nodeManager = new NodeManager(this);

        // set state to idle, to allow connections and such
        OpenAudioMc.getInstance().getStateService().setState(new IdleState("OpenAudioMc started and awaiting command"));

        // timing end and calc
        Instant finish = Instant.now();
        OpenAudioLogger.toConsole("Starting and loading took " + Duration.between(boot, finish).toMillis() + "MS");
    }

    /**
     * save configuration and stop the plugin
     */
    @Override
    public void onDisable() {
        OpenAudioMc.getInstance().disable();
    }

}
