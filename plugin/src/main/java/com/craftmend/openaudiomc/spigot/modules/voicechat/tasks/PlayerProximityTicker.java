package com.craftmend.openaudiomc.spigot.modules.voicechat.tasks;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.enums.TickEventType;
import com.craftmend.openaudiomc.api.impl.event.events.PlayerLeaveVoiceProximityEvent;
import com.craftmend.openaudiomc.api.impl.event.enums.VoiceEventCause;
import com.craftmend.openaudiomc.api.impl.event.events.SystemReloadEvent;
import com.craftmend.openaudiomc.api.impl.event.events.VoiceChatPeerTickEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.client.ClientConnection;
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

            // find players that we don't have yet
            applicableClients
                    .stream()
                    .filter(peer -> !client.getRtcSessionManager().getSubscriptions().contains(peer.getOwner().getUniqueId()))
                    .forEach(peer -> {
                        // connect with these
                        client.getRtcSessionManager().linkTo(peer);
                    });

            // check if we have any peers that are no longer applicable
            for (UUID uuid : client.getRtcSessionManager().getSubscriptions()
                    .stream()
                    .filter(p -> p != client.getOwner().getUniqueId())
                    .filter(uuid -> !applicableClients.stream().anyMatch(apc -> apc.getOwner().getUniqueId() == uuid))
                    .collect(Collectors.toSet())) {

                // unsubscribe these
                ClientConnection peer = OpenAudioMc.getService(NetworkingService.class).getClient(uuid);

                client.sendPacket(new PacketClientDropVoiceStream(new ClientVoiceDropPayload(peer.getRtcSessionManager().getStreamKey())));
                peer.sendPacket(new PacketClientDropVoiceStream(new ClientVoiceDropPayload(client.getRtcSessionManager().getStreamKey())));

                peer.getRtcSessionManager().getSubscriptions().remove(client.getOwner().getUniqueId());
                client.getRtcSessionManager().getSubscriptions().remove(peer.getOwner().getUniqueId());

                AudioApi.getInstance().getEventDriver().fire(new PlayerLeaveVoiceProximityEvent(client, peer, VoiceEventCause.NORMAL));
                AudioApi.getInstance().getEventDriver().fire(new PlayerLeaveVoiceProximityEvent(peer, client, VoiceEventCause.NORMAL));

                client.getRtcSessionManager().updateLocationWatcher();
                peer.getRtcSessionManager().updateLocationWatcher();
            }
        }

        AudioApi.getInstance().getEventDriver().fire(new VoiceChatPeerTickEvent(TickEventType.AFTER_TICK));
    }
}
