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
     * This method is in theory called for both the speaker and listener with the positions inverted (to register each other
     * as peers). This means that if Player A is the listener and Player B is the speaker and the code should return {@code false},
     * then when the method is called and Player A is the speaker/Player B is the listener, it should also return {@code false}.
     *
     * @param listener The {@link Player} searching for other players to listen to
     * @param possibleSpeaker The {@link Player} who is being checked to see if they can be heard
     * @return {@code true} if the listener should be able to hear the possibleSpeaker
     */
    boolean isPlayerValidListener(Player listener, Player possibleSpeaker);
}
