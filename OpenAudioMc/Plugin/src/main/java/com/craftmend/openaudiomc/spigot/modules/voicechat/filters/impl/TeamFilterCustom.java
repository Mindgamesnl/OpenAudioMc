package com.craftmend.openaudiomc.spigot.modules.voicechat.filters.impl;

import com.craftmend.openaudiomc.api.voice.CustomPlayerFilter;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.scoreboard.Team;

public class TeamFilterCustom implements CustomPlayerFilter {

    @Override
    public boolean isPlayerValidListener(Player listener, Player possibleSpeaker) {
        // is there a scoreboard present?
        if (Bukkit.getScoreboardManager() == null) return true;

        boolean assignmentMatch = true;
        for (Team team : Bukkit.getScoreboardManager().getMainScoreboard().getTeams()) {
            boolean foundPlayerA = team.hasEntry(listener.getName());
            boolean foundPlayerB = team.hasEntry(possibleSpeaker.getName());

            if (foundPlayerA && foundPlayerB) {
                return true;
            }

            // is only one of the players in the team?
            if (foundPlayerA || foundPlayerB) {
                assignmentMatch = false;
            }
        }

        return assignmentMatch;
    }

}
