package com.craftmend.openaudiomc.spigot.modules.voicechat.tasks;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.enums.TickEventType;
import com.craftmend.openaudiomc.api.impl.event.events.PlayerLeaveVoiceProximityEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.VoiceEventCause;
import com.craftmend.openaudiomc.api.impl.event.events.SystemReloadEvent;
import com.craftmend.openaudiomc.api.impl.event.events.VoiceChatPeerTickEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientDropVoiceStream;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceDropPayload;
import com.craftmend.openaudiomc.generic.utils.data.Filter;
import com.craftmend.openaudiomc.spigot.modules.voicechat.filters.PeerFilter;
import lombok.Setter;
import org.bukkit.entity.Player;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class PlayerProximityTicker implements Runnable {

    @Setter
    private Filter<ClientConnection, Player> filter;

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
        // pre tick
        AudioApi.getInstance().getEventDriver().fire(new VoiceChatPeerTickEvent(TickEventType.BEFORE_TICK));

        for (ClientConnection client : OpenAudioMc.getService(NetworkingService.class).getClients()) {
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

            // remove moderators, if I'm not moderating myself
            if (!client.getSession().isModerating()) {
                applicableClients.removeIf(other -> other.getSession().isModerating());
            }

            // find players that we don't have yet
            applicableClients
                    .stream()
                    .filter(peer -> !client.getRtcSessionManager().getListeningTo().contains(peer.getOwner().getUniqueId()))
                    .filter(peer -> !peer.getSession().isResetVc()) // they are already resetting, give it a sec
                    .filter(peer -> (client.isModerating() || !peer.isModerating())) // ignore moderators

                    .forEach(peer -> {
                        // connect with these
                        client.getRtcSessionManager().linkTo(peer);
                        // add them as a recent if we already have its data cached
                        if (client.getDataCache() != null) {
                            client.getDataCache().pushPeerName(peer.getOwner().getName());
                        }
                    });

            // check if we have any peers that are no longer applicable
            for (UUID uuid : client.getRtcSessionManager().getListeningTo()
                    .stream()
                    .filter(p -> p != client.getOwner().getUniqueId())
                    .filter(uuid -> (client.getSession().isResetVc() || applicableClients.stream().noneMatch(apc -> apc.getOwner().getUniqueId() == uuid)))
                    .collect(Collectors.toSet())) {

                // unsubscribe these
                ClientConnection peer = OpenAudioMc.getService(NetworkingService.class).getClient(uuid);

                client.getPeerQueue().drop(peer.getRtcSessionManager().getStreamKey());
                AudioApi.getInstance().getEventDriver().fire(new PlayerLeaveVoiceProximityEvent(client, peer, VoiceEventCause.NORMAL));
                client.getRtcSessionManager().updateLocationWatcher();
                client.getRtcSessionManager().getListeningTo().remove(peer.getOwner().getUniqueId());

                if (peer.isModerating()) {
                    continue;
                }

                peer.getPeerQueue().drop(client.getRtcSessionManager().getStreamKey());
                peer.getRtcSessionManager().getListeningTo().remove(client.getOwner().getUniqueId());
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
