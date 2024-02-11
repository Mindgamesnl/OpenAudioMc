package com.craftmend.openaudiomc.generic.client.session;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.client.*;
import com.craftmend.openaudiomc.api.voice.VoicePeerOptions;
import com.craftmend.openaudiomc.generic.client.enums.RtcBlockReason;
import com.craftmend.openaudiomc.generic.client.enums.RtcStateFlag;
import com.craftmend.openaudiomc.generic.client.helpers.ClientRtcLocationUpdate;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.node.packets.ForceMuteMicrophonePacket;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.utils.data.RandomString;
import com.craftmend.openaudiomc.generic.voicechat.bus.VoiceApiConnection;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.enums.PlayerLocationFollower;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.voicechat.channels.Channel;
import com.craftmend.openaudiomc.spigot.services.world.Vector3;
import lombok.Getter;
import lombok.Setter;
import org.bukkit.Location;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class RtcSessionManager implements Serializable {

    @Getter
    private boolean isMicrophoneEnabled = false;
    @Getter
    private boolean isVoicechatDeafened = false;

    @Getter
    private final transient Set<UUID> currentGlobalPeers = ConcurrentHashMap.newKeySet();
    @Getter
    private final transient Set<UUID> currentProximityPeers = ConcurrentHashMap.newKeySet();
    @Getter
    private final transient Set<ClientRtcLocationUpdate> locationUpdateQueue = ConcurrentHashMap.newKeySet();
    @Getter
    private final transient Set<RtcBlockReason> blockReasons = new HashSet<>();
    @Getter
    private final transient Set<RtcStateFlag> stateFlags = new HashSet<>();

    // these are used for messaging, not tracking. N amount players joined, etc
    @Getter
    private final transient Set<UUID> currentProximityAdditions = new HashSet<>();
    @Getter
    private final transient Set<UUID> currentProximityDrops = new HashSet<>();

    // channel stuff
    @Getter
    @Setter
    private Channel currentChannel = null;


    @Setter
    @Getter
    private String streamKey;
    private transient Location lastPassedLocation = null;
    private final transient ClientConnection clientConnection;

    public RtcSessionManager(ClientConnection clientConnection) {
        this.streamKey = new RandomString(15).nextString();
        this.clientConnection = clientConnection;

        this.clientConnection.onDisconnect(() -> {
            // go over all other clients, check if we might have a relations ship and break up if thats the case
            currentProximityPeers.clear();
            currentGlobalPeers.clear();
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
    public boolean requestLinkage(ClientConnection peer, boolean mutual, VoicePeerOptions options) {
        if (!isReady())
            return false;

        if (!peer.getRtcSessionManager().isReady())
            return false;

        // only force the other user to subscribe if they are not already listening to me and mutual is true
        if (mutual && !peer.getRtcSessionManager().currentProximityPeers.contains(clientConnection.getOwner().getUniqueId())) {
            ClientPeerAddEvent event = (ClientPeerAddEvent) EventApi.getInstance().callEvent(new ClientPeerAddEvent(
                    clientConnection,
                    peer,
                    options.clone()
            ));

            if (!event.isCancelled()) {
                peer.getRtcSessionManager().getCurrentProximityPeers().add(clientConnection.getOwner().getUniqueId());
                peer.getPeerQueue().addSubscribe(clientConnection, peer, event.getOptions());
                peer.getRtcSessionManager().updateLocationWatcher();
            }
        }

        // in case that I'm already listening to the other user, don't do anything
        // we do this after the mutual handling, so that still continues if I'm already listening to the other user
        if (currentProximityPeers.contains(peer.getOwner().getUniqueId()))
            return false;

        ClientPeerAddEvent event = (ClientPeerAddEvent) EventApi.getInstance().callEvent(new ClientPeerAddEvent(
                peer,
                clientConnection,
                options.clone()
        ));

        if (!event.isCancelled()) {
            currentProximityPeers.add(peer.getOwner().getUniqueId());
            clientConnection.getPeerQueue().addSubscribe(peer, clientConnection, event.getOptions());
            updateLocationWatcher();
        }

        return true;
    }

    /**
     * Completely block/unblock speaking for a client.
     * This will forcefully block their microphone on the client and server side making them unable to speak
     * no matter what their microphone settings are
     *
     * @param allow If speaking is allowed
     */
    public void preventSpeaking(boolean allow) {
        // platform dependant
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMc.getInstance().getInvoker().isNodeServer()) {
            // forward to proxy
            User user = clientConnection.getUser();
            OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(user, new ForceMuteMicrophonePacket(clientConnection.getOwner().getUniqueId(), allow));
            return;
        }
        VoiceApiConnection voiceService = OpenAudioMc.getService(OpenaudioAccountService.class).getVoiceApiConnection();

        if (allow) {
            voiceService.forceMute(clientConnection);
        } else {
            voiceService.forceUnmute(clientConnection);
        }
    }

    public void makePeersDrop() {
        for (ClientConnection peer : OpenAudioMc.getService(NetworkingService.class).getClients()) {
            if (peer.getOwner().getUniqueId() == clientConnection.getOwner().getUniqueId())
                continue;

            if (peer.getRtcSessionManager().currentProximityPeers.contains(clientConnection.getOwner().getUniqueId())) {
                // send unsub packet
                peer.getRtcSessionManager().currentProximityPeers.remove(clientConnection.getOwner().getUniqueId());
                peer.getRtcSessionManager().updateLocationWatcher();
                peer.getPeerQueue().drop(streamKey);

                EventApi.getInstance().callEvent(new ClientPeerRemovedEvent(clientConnection, peer));
            }
        }
    }

    public void onLocationTick(Location location) {
        if (this.isReady() && this.isMicrophoneEnabled() && this.blockReasons.isEmpty()) {
            this.forceUpdateLocation(location);
        } else {
            lastPassedLocation = location;
        }
    }

    public void forceUpdateLocation(Location location) {
        for (ClientConnection peer : OpenAudioMc.getService(NetworkingService.class).getClients()) {
            if (peer.getOwner().getUniqueId() == clientConnection.getOwner().getUniqueId())
                continue;

            if (peer.getRtcSessionManager().currentProximityPeers.contains(clientConnection.getOwner().getUniqueId())) {
                peer.getRtcSessionManager().locationUpdateQueue.add(
                        ClientRtcLocationUpdate
                                .fromClientWithLocation(clientConnection, location, Vector3.from(peer))
                );
            }
        }
    }

    public void updateLocationWatcher() {
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT) {
            SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(clientConnection.getOwner().getUniqueId());
            if (spigotConnection == null) {
                // player logged out, ignoring
                return;
            }
            if (currentProximityPeers.isEmpty()) {
                spigotConnection.getLocationFollowers().remove(PlayerLocationFollower.PROXIMITY_VOICE_CHAT);
            } else {
                spigotConnection.getLocationFollowers().add(PlayerLocationFollower.PROXIMITY_VOICE_CHAT);
            }
        }
    }

    public boolean isReady() {
        if (clientConnection.getDataCache() != null && clientConnection.getDataCache().getIsVoiceBlocked()) {
            return false;
        }

        return clientConnection.isConnected() && clientConnection.getSession().isConnectedToRtc();
    }

    public void setVoicechatDeafened(boolean state) {
        if (state == this.isVoicechatDeafened) return;
        this.isVoicechatDeafened = state;
        if (!this.isReady()) return;

        if (state) {
            EventApi.getInstance().callEvent(new VoicechatDeafenEvent(clientConnection));
        } else {
            EventApi.getInstance().callEvent(new VoicechatUndeafenEvent(clientConnection));
        }
    }

    public void setMicrophoneEnabled(boolean state) {
        if (state == this.isMicrophoneEnabled) return;
        if (!this.isMicrophoneEnabled && state) {
            if (this.lastPassedLocation != null) {
                forceUpdateLocation(lastPassedLocation);
            }
        }

        this.isMicrophoneEnabled = state;

        if (!this.isReady()) return;

        if (state) {
            EventApi.getInstance().callEvent(new MicrophoneUnmuteEvent(clientConnection));
        } else {
            EventApi.getInstance().callEvent(new MicrophoneMuteEvent(clientConnection));
        }
    }

    public boolean isPeer(UUID uuid) {
        return currentProximityPeers.contains(uuid) || currentGlobalPeers.contains(uuid);
    }

}
