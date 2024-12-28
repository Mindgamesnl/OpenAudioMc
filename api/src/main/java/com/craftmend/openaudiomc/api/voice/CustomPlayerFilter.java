package com.craftmend.openaudiomc.api.voice;

import org.bukkit.entity.Player;

/**
 * <p>This represents a function that can be implemented by any plugin in order to modify how players will be checked
 * against each other.</p>
 *
 * <p>The easiest example is a game plugin, which will not let players hear each other if they are on different teams, or moderation
 * where you would prevent two players from hearing each other if one of them has been muted/punished.</p>
 *
 * <p>This function is called AFTER the other sanity checks at the time of writing, meaning that these functions will
 * be called assuming the players are in valid range of each other and so forth.</p>
 *
 * <p>Please note that a filter is only called in one direction, meaning that if its called for playerA -> playerB, it will not be called for playerB -> playerA.
 * This is done as an optimization to prevent poor scaling with a large amount of players.</p>
 *
 * <p>Because of that, filters should only be used to filter players that should be considered for voicechat.
 * If you with to setup one-directional voicechat, then you should use {@link com.craftmend.openaudiomc.api.events.client.ClientPeerAddEvent}, which will be called twice
 * (once for each player) and allow you to cancel the event if you don't want the players to be able to hear each other.</p>
 *
 * <p>Filters are managed through the {@link com.craftmend.openaudiomc.api.VoiceApi}</p>
 *
 * @author DiamondDagger590
 * @author Mats
 * @since 6.10.0
 */
@FunctionalInterface
public interface CustomPlayerFilter {

    /**
     * This method is effectively a filter call from a Stream.
     * The return value decides if the two players should be allowed to connect in voicechat, granted that the events (which are only fired
     * for players who pass) aren't cancelled.
     * <br />
     * This method is called once for every combination of players (ignoring order)
     * <br />
     * If this combination should result in a valid connection, then the method should return {@code true}.
     * If the combination should not be valid, then the method should return {@code false}, which will also prevent further
     * events or filters from being called for this combination.
     *
     * @param listener        The {@link Player} searching for other players to listen to
     * @param possibleSpeaker The {@link Player} who is being checked to see if they can be heard
     * @return {@code true} if the listener should be able to hear the possibleSpeaker
     */
    boolean isPlayerValidListener(Player listener, Player possibleSpeaker);
}
