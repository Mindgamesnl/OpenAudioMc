package com.craftmend.openaudiomc.spigot.modules.voicechat.tasks;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.client.ClientPeerRemovedEvent;
import com.craftmend.openaudiomc.api.events.client.SystemReloadEvent;
import com.craftmend.openaudiomc.api.events.client.VoicechatPeerTickEvent;
import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.utils.data.Filter;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.PeerFilter;
import com.craftmend.openaudiomc.spigot.modules.voicechat.utils.CombinationChecker;
import lombok.Setter;
import org.bukkit.entity.Player;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class PlayerPeerTicker implements Runnable {

    @Setter
    private Filter<ClientConnection, Player> filter;

    /**
     * The proximity ticker is what runs most of the business-logic for voice chat. It's responsible for
     * linking players together, dropping players that are too far away and handling all the logic for
     * the voice chat system.
     * <br>
     * It's important to keep in mind that efficiency must scale with the amount of players online,
     * because it's easy to accidentally write a nested loop going over all players, which would
     * be a disaster for performance. (N^2 is a big no-no)
     * <br>
     * We try to calculate the max checks that could be done per player, and store these results in an array.
     * This gives us cheap lookups for next iterations, and is reasonably memory effective.
     * (arrays in java *do not* allocate memory for the entire footprint of the value, but only reserves a
     * 64 bit pointer for the array, referencing client data we already have in memory)
     * <br>
     * Default behaviour is just normal proximity checks, but with a few edge cases:
     * <ul>
     * <li>If a player is considered a moderator, then it won't allow mutual connections with normal players</li>
     * <li>If a player has N amount of "global" peers, then they should not be considered for proximity checks</li>
     * </ul>
     * <br>
     * If you're reading this and looking to implement your own proximity checks, through the API, then please
     * be aware of the design choices made here and consider following a similar pattern.
     * Here be dragons.
     */

    public PlayerPeerTicker(int maxDistance, PeerFilter peerFilter) {
        this.filter = peerFilter;
        this.filter.updateProperty("d", maxDistance);

        EventApi.getInstance().registerHandler(SystemReloadEvent.class, e -> {
            this.filter.updateProperty("d", maxDistance);
        });
    }

    public void addFilter(Filter<ClientConnection, Player> extraFilter) {
        this.filter.addChild(extraFilter);
    }

    @Override
    public void run() {
        // we'll reference everything during this tick based on this initial time snapshot. This prevents
        // concurrency issues later on, and means we can do relatively fast arrayCopy's when needed.
        // to save time, we'll pre-filter some results.
        ClientConnection[] allClients = OpenAudioMc.getService(NetworkingService.class)
                .getClients()
                .stream()
                .filter((c) -> c.getRtcSessionManager().isReady())
                .toArray(ClientConnection[]::new);

        CombinationChecker combinationChecker = new CombinationChecker();

        for (ClientConnection client : allClients) {
            Player player = (Player) client.getUser().getOriginal();

            // are we blocked?
            Set<ClientConnection> applicableClients;
            if (!client.getRtcSessionManager().getBlockReasons().isEmpty()) {
                // empty set, no peers for you :(
                applicableClients = new HashSet<>();
            } else {
                // make a copy of the allClients, except with entries where combination checks failed
                // order from cheap/most occurring to expensive/least occurring
                Stream<ClientConnection> pre = Stream.of(allClients)
                        .filter((c) -> !c.getSession().isResetVc()) // don't check players that are resetting
                        .filter((c) -> c.getOwner().getUniqueId() != client.getOwner().getUniqueId()) // don't check yourself
                        // only run these checks if we're either both not moderating, or I am but the other isn't
                        .filter((c) -> client.isModerating() == c.isModerating() || client.isModerating() && !c.isModerating())
                        // mark checked, prior to filtering, because if someone isn't
                        // applicable, then they should still be marked as checked to prevent
                        // future checks
                        .filter((c) -> combinationChecker.getAndPutIfAbsent(client.getUser().getUniqueId(), c.getUser().getUniqueId(), false) == CombinationChecker.NOT_CHECKED) // don't check combinations that failed
                        .filter(c -> !client.getRtcSessionManager().getCurrentGlobalPeers().contains(c.getOwner().getUniqueId())) // exempt global peers
                        ;

                // execute API filters
                applicableClients = filter.wrap(
                        pre,
                        player
                ).collect(Collectors.toSet());
            }

            // find players that we don't have yet
            applicableClients.forEach(peer -> {
                combinationChecker.markChecked(client.getUser().getUniqueId(), peer.getUser().getUniqueId(), true);

                // am I moderating compared to this peer?
                boolean isModerating = client.isModerating() && !peer.isModerating();

                // only setup mutual connection if out moderation state is the same
                client.getRtcSessionManager().requestLinkage(peer, !isModerating, VoicePeerOptions.DEFAULT);

                // add them as a recent if we already have its data cached
                if (client.getDataCache() != null) {
                    client.getDataCache().pushPeerName(peer.getOwner().getName());
                }

                // add them to the peer too
                if (peer.getDataCache() != null) {
                    peer.getDataCache().pushPeerName(client.getOwner().getName());
                }
            });

            // check if we have any peers that are no longer applicable
            for (UUID uuid : client.getRtcSessionManager().getCurrentProximityPeers()
                    .stream()
                    // ignore self
                    .filter(p -> p != client.getOwner().getUniqueId())
                    // allow if its resetting or if its not in the applicable list
                    .filter(uuid -> (client.getSession().isResetVc() ||
                            // if the byte is either 0 or 1, then its not checked or false
                            combinationChecker.stateIs(client.getOwner().getUniqueId(), uuid) != CombinationChecker.CHECKED_TRUE
                    ))
                    // not in the global list
                    .filter(uuid -> !client.getRtcSessionManager().getCurrentGlobalPeers().contains(uuid))
                    .collect(Collectors.toSet())) {

                // unsubscribe these
                ClientConnection peer = OpenAudioMc.getService(NetworkingService.class).getClient(uuid);

                if (peer == null) {
                    // remove from list
                    client.getRtcSessionManager().getCurrentProximityPeers().remove(uuid);
                    continue;
                }

                client.getPeerQueue().drop(peer.getRtcSessionManager().getStreamKey());
                EventApi.getInstance().callEvent(new ClientPeerRemovedEvent(client, peer));
                client.getRtcSessionManager().updateLocationWatcher();
                client.getRtcSessionManager().getCurrentProximityPeers().remove(peer.getOwner().getUniqueId());

                // they started moderating, so we'll leave them alone
                if (peer.isModerating()) {
                    continue;
                }

                peer.getPeerQueue().drop(client.getRtcSessionManager().getStreamKey());
                EventApi.getInstance().callEvent(new ClientPeerRemovedEvent(peer, client));
                peer.getRtcSessionManager().getCurrentProximityPeers().remove(client.getOwner().getUniqueId());
                peer.getRtcSessionManager().updateLocationWatcher();
            }

            for (UUID currentGlobalPeer : client.getRtcSessionManager().getCurrentGlobalPeers()) {
                // clean
                ClientConnection peer = OpenAudioMc.getService(NetworkingService.class).getClient(currentGlobalPeer);
                boolean dead = peer == null || !peer.getRtcSessionManager().isReady();
                if (dead) {
                    client.getRtcSessionManager().getCurrentGlobalPeers().remove(currentGlobalPeer);
                    client.getPeerQueue().drop(currentGlobalPeer.toString());
                    // but mats, thats not a stream key! correct, we may have lost that by now, the client should search by uuid
                    // as fallback if the string is longer than 32 characters
                }
            }
        }

        // flush all voicechat updates
        for (ClientConnection client : allClients) {
            client.getPeerQueue().flushDropsAndSubscriptions(client);
            client.getSession().setResetVc(false);
        }

        EventApi.getInstance().callEvent(new VoicechatPeerTickEvent());
    }
}
