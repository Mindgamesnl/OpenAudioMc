package com.craftmend.openaudiomc.spigot.modules.voicechat.filters.impl;

import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.CustomFilterFunction;
import org.bukkit.entity.Player;

public class GamemodeFilter implements CustomFilterFunction {
    @Override
    public boolean isPlayerValidListener(Player listener, Player possibleSpeaker) {
        return listener.getGameMode() == possibleSpeaker.getGameMode();
    }
}
