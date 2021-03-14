package com.craftmend.openaudiomc.spigot.modules.voicechat.filters;

import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.player.SpigotPlayerAdapter;
import com.craftmend.openaudiomc.generic.utils.Filter;
import lombok.AllArgsConstructor;
import org.bukkit.entity.Player;

import java.util.stream.Stream;

@AllArgsConstructor
public class PeerFilter extends Filter<ClientConnection, Player> {

    private final int maxDistance;

    /**
     * Filter/find applicable players for voicechat
     *
     * The given stream is a collection of players that have the voice feature enabled.
     * The second player argument represents the player who is looking for peers.
     *
     * So lets say that we have three players online; Josh, James and Jimmy
     * That'd mean that they each get their own discovery iteration, where Jimmy is the context,
     * streaming over Josh and James to check if they are compatible
     */
    @Override
    public Stream<ClientConnection> wrap(Stream<ClientConnection> existingStream, Player context) {
        return existingStream
                .filter(possiblePeer -> {
                    // check if the player is even valid
                    if (!possiblePeer.getClientRtcManager().isReady()) return false;

                    // get the player, we know that it's save to do so
                    Player otherPlayer = ((SpigotPlayerAdapter) possiblePeer.getPlayer()).getPlayer();

                    // first of all, block the player if they are actually me (dork)
                    if (otherPlayer.getName().equals(context.getName())) return false;

                    // check if one of us is dead
                    if (otherPlayer.isDead() || context.isDead()) return false;

                    // check if we exist in the same world
                    if (!otherPlayer.getWorld().getName().equals(context.getWorld().getName())) return false;

                    // check if the players are within distance
                    return otherPlayer.getLocation().distanceSquared(context.getLocation()) < maxDistance;
                });
    }
}
