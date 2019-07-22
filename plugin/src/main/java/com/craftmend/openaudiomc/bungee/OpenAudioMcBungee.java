package com.craftmend.openaudiomc.bungee;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.services.state.states.IdleState;
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
     * Modules used
     */


    @Override
    public void onEnable() {
        // Timing
        Instant boot = Instant.now();

        instance = this;

        // setup core
        new OpenAudioMcCore(Platform.BUNGEE);

        // set state to idle, to allow connections and such
        OpenAudioMcCore.getInstance().getStateService().setState(new IdleState("OpenAudioMc started and awaiting command"));

        // timing end and calc
        Instant finish = Instant.now();
        System.out.println(OpenAudioMcCore.getLOG_PREFIX() + "Starting and loading took " + Duration.between(boot, finish).toMillis() + "MS");
    }

}
