package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.PlayerEnterVoiceProximityEvent;
import com.craftmend.openaudiomc.api.impl.event.events.PlayerLeaveVoiceProximityEvent;
import com.craftmend.openaudiomc.api.impl.event.events.enums.VoiceEventCause;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientDropVoiceStream;
import com.craftmend.openaudiomc.generic.networking.packets.client.voice.PacketClientSubscribeToVoice;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceDropPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.client.voice.ClientVoiceSubscribePayload;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.enums.PlayerLocationFollower;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import lombok.Getter;
import lombok.Setter;
import org.bukkit.Location;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class ClientRtcManager {

    @Setter
    @Getter
    private boolean isMicrophoneEnabled = false;
    @Getter
    private Set<UUID> subscriptions = new HashSet<>();
    private ClientConnection clientConnection;
    @Getter
    private Set<ClientRtcLocationUpdate> locationUpdateQueue = ConcurrentHashMap.newKeySet();



    public ClientRtcManager(ClientConnection clientConnection) {
        this.clientConnection = clientConnection;

        this.clientConnection.onDisconnect(() -> {
            // go over all other clients, check if we might have a relations ship and break up if thats the case
            subscriptions.clear();
            this.isMicrophoneEnabled = false;
            makePeersDrop();
            locationUpdateQueue.clear();
        });
    }

    /**
     * Makes two users listen to one another
     *
     * @param peer Who I should become friends with
     * @return If I became friends
     */
    public boolean linkTo(ClientConnection peer) {
        if (!isReady())
            return false;

        if (!peer.getClientRtcManager().isReady())
            return false;

        if (subscriptions.contains(peer.getOwnerUUID()))
            return false;

        if (peer.getClientRtcManager().subscriptions.contains(clientConnection.getOwnerUUID()))
            return false;

        peer.getClientRtcManager().getSubscriptions().add(clientConnection.getOwnerUUID());
        subscriptions.add(peer.getOwnerUUID());

        peer.sendPacket(new PacketClientSubscribeToVoice(ClientVoiceSubscribePayload.fromClient(clientConnection)));
        clientConnection.sendPacket(new PacketClientSubscribeToVoice(ClientVoiceSubscribePayload.fromClient(peer)));

        // throw events in both ways, since the two users are listening to eachother
        AudioApi.getInstance().getEventDriver().fire(new PlayerEnterVoiceProximityEvent(clientConnection, peer, VoiceEventCause.NORMAL));
        AudioApi.getInstance().getEventDriver().fire(new PlayerEnterVoiceProximityEvent(peer, clientConnection, VoiceEventCause.NORMAL));

        updateLocationWatcher();
        peer.getClientRtcManager().updateLocationWatcher();

        return true;
    }

    public void makePeersDrop() {
        for (ClientConnection peer : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
            if (peer.getOwnerUUID() == clientConnection.getOwnerUUID())
                continue;

            if (peer.getClientRtcManager().subscriptions.contains(clientConnection.getOwnerUUID())) {
                // send unsub packet
                peer.getClientRtcManager().subscriptions.remove(clientConnection.getOwnerUUID());
                peer.getClientRtcManager().updateLocationWatcher();
                peer.sendPacket(new PacketClientDropVoiceStream(new ClientVoiceDropPayload(clientConnection.getStreamKey())));

                AudioApi.getInstance().getEventDriver().fire(new PlayerLeaveVoiceProximityEvent(clientConnection, peer, VoiceEventCause.NORMAL));
            }
        }
    }

    public void onLocationTick(Location location) {
        for (ClientConnection peer : OpenAudioMc.getInstance().getNetworkingService().getClients()) {
            if (peer.getOwnerUUID() == clientConnection.getOwnerUUID())
                continue;

            if (peer.getClientRtcManager().subscriptions.contains(clientConnection.getOwnerUUID())) {
                peer.getClientRtcManager().locationUpdateQueue.add(new ClientRtcLocationUpdate(
                        clientConnection.getStreamKey(),
                        location.getX(),
                        location.getY(),
                        location.getZ()
                ));
            }
        }
    }

    public void updateLocationWatcher() {
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
            SpigotConnection spigotConnection = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(clientConnection.getOwnerUUID());
            if (subscriptions.isEmpty()) {
                spigotConnection.getLocationFollowers().remove(PlayerLocationFollower.PROXIMITY_VOICE_CHAT);
            } else {
                spigotConnection.getLocationFollowers().add(PlayerLocationFollower.PROXIMITY_VOICE_CHAT);
            }
        }
    }

    public boolean isReady() {
        return clientConnection.isConnected() && clientConnection.isConnectedToRtc();
    }
}
