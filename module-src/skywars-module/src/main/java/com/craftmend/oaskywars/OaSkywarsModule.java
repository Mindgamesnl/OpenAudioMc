package com.craftmend.oaskywars;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.enums.ModuleEvent;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.CustomFilterFunction;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.FilterService;
import com.walrusone.skywarsreloaded.enums.MatchState;
import com.walrusone.skywarsreloaded.game.GameMap;
import com.walrusone.skywarsreloaded.game.TeamCard;
import com.walrusone.skywarsreloaded.managers.MatchManager;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.server.PluginEnableEvent;

public final class OaSkywarsModule extends ExternalModule implements Listener {

    private int loadedComponents = 0;

    public OaSkywarsModule() {

    }

    @Override
    public String getName() {
        return "Parties module";
    }

    @Override
    public String getDescription() {
        return "OpenAudioMc module for Skywars reloaded";
    }

    @Override
    public void onInitialize() {
        if (Bukkit.getPluginManager().isPluginEnabled("Skywars"))
            bootComponent();
    }

    @EventHandler
    public void onPluginLoad(PluginEnableEvent event) {
        if (event.getPlugin().getName().equals("Skywars")) {
            bootComponent();
        }
    }

    @Override
    public void on(ModuleEvent event) {
        if (event == ModuleEvent.PLATFORM_LOADED) {
            bootComponent();
        }
    }

    private void bootComponent() {
        loadedComponents++;
        if (loadedComponents != 2) return;

        // hook into both plugins
        OpenAudioMc.getService(FilterService.class).addFilterFunction(new CustomFilterFunction() {
            @Override
            public boolean isPlayerValidListener(Player listener, Player possibleSpeaker) {
                return OaSkywarsModule.this.isPlayerValidListener(listener, possibleSpeaker);
            }
        });
    }

    private boolean isPlayerValidListener(Player p1, Player p2) {
        MatchManager matchManager = MatchManager.get();
        GameMap m1 = matchManager.getPlayerMap(p1);
        GameMap m2 = matchManager.getPlayerMap(p2);

        if (m1 == null || m2 == null) {
            // Only allow when both are actually null
            return m1 == null && m2 == null;
        }

        // check game state
        if (isGameRunning(m1) && isGameRunning(m2)) {
            // check teams
            TeamCard t1, t2;
            t1 = m1.getTeamCard(p1);
            t2 = m2.getTeamCard(p2);

            // only allow if we share  ateam
            return t1.getTeamName().equals(t2.getTeamName());
        }

        // Only valid if both games aren't running
        return isGameRunning(m1) == isGameRunning(m2);
    }

    private boolean isGameRunning(GameMap gm) {
        MatchState ms = gm.getMatchState();
        switch (ms) {
            case PLAYING:
            case ENDING:
                return true;
            default:
                return false;
        }
    }
}
