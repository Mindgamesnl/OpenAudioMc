package com.craftmend.openaudiomc.spigot.modules.voicechat.tasks;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.enums.TickEventType;
import com.craftmend.openaudiomc.api.impl.event.events.PlayerLeaveVoiceProximityEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.VoiceEventCause;
import com.craftmend.openaudiomc.api.impl.event.events.SystemReloadEvent;
import com.craftmend.openaudiomc.api.impl.event.events.VoiceChatPeerTickEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.objects.VoicePeerOptions;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.utils.data.Filter;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.PeerFilter;
import com.craftmend.openaudiomc.spigot.modules.voicechat.utils.CombinationChecker;
import lombok.Setter;
import org.bukkit.entity.Player;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class PlayerProximityTicker implements Runnable {

    @Setter
    private Filter<ClientConnection, Player> filter;

    /**
     * The proximity ticker is what runs most of the business-logic for voice chat. It's responsible for
     * linking players together, dropping players that are too far away and handling all the logic for
     * the voice chat system.
     * <br>
     * It's important to keep in mind that efficiency must scale with the amount of players online,
     * because it's easy to accidentally write a nested loop going over all players, which would
     * be a disaster for performance. (N^2)
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

    public PlayerProximityTicker(int maxDistance, PeerFilter peerFilter) {
        this.filter = peerFilter;
        this.filter.updateProperty("d", maxDistance);

        AudioApi.getInstance().getEventDriver().on(SystemReloadEvent.class).setHandler(e -> {
            this.filter.updateProperty("d", maxDistance);
        });
    }

    public void addFilter(Filter<ClientConnection, Player> extraFilter) {
        this.filter.addChild(extraFilter);
    }

    @Override
    public void run() {
        // pre-tick event, to take care of any pre-tick logic elsewhere
        AudioApi.getInstance().getEventDriver().fire(new VoiceChatPeerTickEvent(TickEventType.BEFORE_TICK));

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

            // am I valid? no? do nothing.
            if (!client.getRtcSessionManager().isReady()) continue;

            Player player = (Player) client.getUser().getOriginal();

            // find clients in this world, in radius and that are connected with RTC
            Set<ClientConnection> applicableClients = filter.wrap(
                    OpenAudioMc.getService(NetworkingService.class).getClients().stream(),
                    player
            ).collect(Collectors.toSet());

            // clear the applicable players if i'm disabled myself
            if (!client.getRtcSessionManager().getBlockReasons().isEmpty()) applicableClients.clear();

            // find players that we don't have yet
            applicableClients
                    .stream()
                    .filter(peer -> {
                        if (combinationChecker.hasChecked(client.getUser().getUniqueId(), peer.getUser().getUniqueId())) return false;
                        return client.getSession().isModerating() && other.getSession().isModerating();
                    })
                    .filter(peer -> !client.getRtcSessionManager().getCurrentProximityPeers().contains(peer.getOwner().getUniqueId()))
                    .filter(peer -> !peer.getSession().isResetVc()) // they are already resetting, give it a sec
                    .filter(peer -> (client.isModerating() || !peer.isModerating())) // ignore moderators

                    .forEach(peer -> {
                        // register check
                        combinationChecker.registerCheck(client.getUser().getUniqueId(), peer.getUser().getUniqueId());

                        // am I moderating compared to this peer?
                        boolean isModerating = client.isModerating() && !peer.isModerating();

                        // only setup mutual connection if out moderation state is the same
                        client.getRtcSessionManager().requestLinkage(peer, !isModerating, VoicePeerOptions.DEFAULT);

                        // add them as a recent if we already have its data cached
                        if (client.getDataCache() != null) {
                            client.getDataCache().pushPeerName(peer.getOwner().getName());
                        }
                    });

            // check if we have any peers that are no longer applicable
            for (UUID uuid : client.getRtcSessionManager().getCurrentProximityPeers()
                    .stream()
                    .filter(p -> p != client.getOwner().getUniqueId())
                    .filter(uuid -> (client.getSession().isResetVc() || applicableClients.stream().noneMatch(apc -> apc.getOwner().getUniqueId() == uuid)))
                    .collect(Collectors.toSet())) {

                // unsubscribe these
                ClientConnection peer = OpenAudioMc.getService(NetworkingService.class).getClient(uuid);

                client.getPeerQueue().drop(peer.getRtcSessionManager().getStreamKey());
                AudioApi.getInstance().getEventDriver().fire(new PlayerLeaveVoiceProximityEvent(client, peer, VoiceEventCause.NORMAL));
                client.getRtcSessionManager().updateLocationWatcher();
                client.getRtcSessionManager().getCurrentProximityPeers().remove(peer.getOwner().getUniqueId());

                if (peer.isModerating()) {
                    continue;
                }

                peer.getPeerQueue().drop(client.getRtcSessionManager().getStreamKey());
                peer.getRtcSessionManager().getCurrentProximityPeers().remove(client.getOwner().getUniqueId());
                AudioApi.getInstance().getEventDriver().fire(new PlayerLeaveVoiceProximityEvent(peer, client, VoiceEventCause.NORMAL));
                peer.getRtcSessionManager().updateLocationWatcher();
            }
        }

        // flush all voicechat updates
        for (ClientConnection client : OpenAudioMc.getService(NetworkingService.class).getClients()) {
            client.getPeerQueue().flush(client);
        }

        for (ClientConnection client : OpenAudioMc.getService(NetworkingService.class).getClients()) {
            client.getSession().setResetVc(false);
        }

        AudioApi.getInstance().getEventDriver().fire(new VoiceChatPeerTickEvent(TickEventType.AFTER_TICK));
    }
}
