package com.craftmend.gamemodefilter;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.CustomFilterFunction;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.FilterService;
import lombok.NoArgsConstructor;
import org.bukkit.entity.Player;
import org.bukkit.event.Listener;

@NoArgsConstructor
public final class OaGamemodeFilter extends ExternalModule implements Listener {

    @Override
    public String getName() {
        return "Gamemode Filter module";
    }

    @Override
    public String getDescription() {
        return "Only allow players with the same gamemode to hear each other";
    }

    @Override
    public void onInitialize() {

    }

    @Override
    public void on(ModuleEvent event) {
        if (event == ModuleEvent.PLATFORM_LOADED) {
            bootComponent();
        }
    }

    private void bootComponent() {
        // hook into both plugins
        OpenAudioMc.getService(FilterService.class).addFilterFunction(new CustomFilterFunction() {
            @Override
            public boolean isPlayerValidListener(Player listener, Player possibleSpeaker) {
                return listener.getGameMode() == possibleSpeaker.getGameMode();
            }
        });
    }
}
