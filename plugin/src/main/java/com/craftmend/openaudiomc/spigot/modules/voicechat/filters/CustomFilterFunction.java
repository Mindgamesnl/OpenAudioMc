package com.craftmend.openaudiomc.spigot.modules.voicechat.filters;

import org.bukkit.entity.Player;

/**
 * This represents a function that can be implemented by any plugin in order to modify how players will be checked
 * against each other.
 *
 * The easiest example is a staff plugin wanting to make sure players can't hear staff, so they make sure that a custom implementation
 * of this function returns false if the possibleSpeaker is staff and the listener isn't.
 *
 * This function is called AFTER the other sanity checks at the time of writing, meaning that these functions will
 * be called assuming the players are in valid range of each other and so forth.
 */
@FunctionalInterface
public interface CustomFilterFunction{

    /**
     * @param listener The {@link Player} searching for other players to listen to
     * @param possibleSpeaker The {@link Player} who is being checked to see if they can be heard
     * @return {@code true} if the listener should be able to hear the possibleSpeaker
     */
    public boolean isPlayerValidListener(Player listener, Player possibleSpeaker);
}
