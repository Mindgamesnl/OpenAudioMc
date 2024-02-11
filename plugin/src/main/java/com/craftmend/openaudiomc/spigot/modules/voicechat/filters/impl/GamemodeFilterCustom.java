package com.craftmend.openaudiomc.spigot.modules.voicechat.filters.impl;

import com.craftmend.openaudiomc.api.voice.CustomPlayerFilter;
import org.bukkit.entity.Player;

public class GamemodeFilterCustom implements CustomPlayerFilter {
    @Override
    public boolean isPlayerValidListener(Player listener, Player possibleSpeaker) {
        return listener.getGameMode() == possibleSpeaker.getGameMode();
    }
}
