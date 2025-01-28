package com.craftmend.openaudiomc.generic.client.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.basic.Actor;
import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.api.events.client.ClientConnectEvent;
import com.craftmend.openaudiomc.api.events.client.ClientDisconnectEvent;
import com.craftmend.openaudiomc.api.events.client.MediaErrorEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.client.ClientDataService;
import com.craftmend.openaudiomc.generic.client.helpers.SerializableClient;
import com.craftmend.openaudiomc.generic.client.helpers.TokenFactory;
import com.craftmend.openaudiomc.generic.client.session.ClientAuth;
import com.craftmend.openaudiomc.generic.client.session.RtcSessionManager;
import com.craftmend.openaudiomc.generic.client.session.SessionData;
import com.craftmend.openaudiomc.generic.client.store.ClientDataStore;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.generic.media.MediaService;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.api.media.MediaError;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.PacketSocketKickClient;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientCreateMedia;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientPreFetch;
import com.craftmend.openaudiomc.generic.networking.packets.client.ui.PacketClientModerationStatus;
import com.craftmend.openaudiomc.generic.networking.packets.client.ui.PacketClientProtocolRevisionPacket;
import com.craftmend.openaudiomc.generic.networking.packets.client.ui.PacketClientSetVolume;
import com.craftmend.openaudiomc.generic.networking.payloads.client.media.ClientPreFetchPayload;
import com.craftmend.openaudiomc.generic.node.packets.ClientConnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientDisconnectedPacket;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.rest.Task;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.OAClientMode;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

public class ClientConnection implements Authenticatable, Client, Serializable,
        com.craftmend.openaudiomc.api.interfaces.Client {

    @Getter
    private transient final User<?> user;

    @Getter
    private final SessionData session;
    @Setter
    private ClientAuth auth;
    @Getter
    private final RtcSessionManager rtcSessionManager;
    private transient final List<Runnable> connectHandlers = new ArrayList<>();
    private transient final List<Runnable> disconnectHandlers = new ArrayList<>();
    @Setter
    @Getter
    private ClientDataStore dataCache;
    @Getter
    private PeerQueue peerQueue = new PeerQueue();

    public ClientConnection(User playerContainer, SerializableClient fromSerialized) {
        this.user = playerContainer;
        this.auth = new TokenFactory().build(this);
        rtcSessionManager = new RtcSessionManager(this);
        session = new SessionData(this);

        if (fromSerialized != null) {
            this.session.applySerializedSession(fromSerialized);
        }

        if (OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_SEND_URL_ON_JOIN)) {
            OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> {
                if (!isConnected()) {
                    this.getAuth().publishSessionUrl();
                }
            }, 20 * StorageKey.SETTINGS_SEND_URL_ON_JOIN_DELAY.getInt());
        }

        getDataStore().setWhenFinished(dataStore -> {
            this.dataCache = dataStore;
            this.dataCache.setLastSeen(Instant.now());

            if (this.dataCache.getIsVoiceBlocked() && this.session.isConnected()) {
                this.kick(() -> {
                    this.user.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "Your connection has been terminated as you have been blocked from voice chat.");
                });
            }
        });
    }

    // client connected!
    @Override
    public void onConnect() {
        session.setSessionUpdated(true);
        if (isConnected()) return;
        Configuration Configuration = OpenAudioMc.getInstance().getConfiguration();

        session.setConnected(true);
        session.setWaitingToken(false);

        OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> {
                    OpenAudioMc.getService(NetworkingService.class).send(this, new PacketClientProtocolRevisionPacket());
                    session.getOngoingMedia().forEach(this::sendMedia);
                    connectHandlers.forEach(Runnable::run);
                },
                3
        );

        // am I a proxy thingy? then send it to my other thingy
        OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(user, new ClientConnectedPacket(user.getUniqueId()));

        EventApi.getInstance().callEvent(new ClientConnectEvent(this));

        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == OAClientMode.NODE)
            return;
        String connectedMessage = Configuration.getString(StorageKey.MESSAGE_CLIENT_OPENED);
        user.sendMessage(Platform.translateColors(connectedMessage));
    }

    @Override
    public void onDisconnect() {
        if (!isConnected()) return;
        // ignore if we're shutting down
        if (OpenAudioMc.getInstance().isDisabled()) return;
        session.setSessionUpdated(true);
        session.setApiSpeakers(0);
        session.setConnectedToRtc(false);
        session.setConnected(false);
        disconnectHandlers.forEach(Runnable::run);

        // am I a proxy thingy? then send it to my other thingy
        OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(user, new ClientDisconnectedPacket(user.getUniqueId()));

        EventApi.getInstance().callEvent(new ClientDisconnectEvent(this));

        // Don't send if i'm spigot and a node
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == OAClientMode.NODE)
            return;
        String message = OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_CLOSED);
        user.sendMessage(Platform.translateColors(message));
    }

    public Task<ClientDataStore> getDataStore() {
        return OpenAudioMc.getService(ClientDataService.class).getClientData(user.getUniqueId(), true, true);
    }

    public ClientConnection addOnConnectHandler(Runnable runnable) {
        this.connectHandlers.add(runnable);
        return this;
    }

    public ClientConnection addOnDisconnectHandler(Runnable runnable) {
        this.disconnectHandlers.add(runnable);
        return this;
    }

    /**
     * change the volume for the client
     *
     * @param volume the new volume
     */
    public void setVolume(int volume) {
        if (volume < 0 || volume > 100) {
            throw new IllegalArgumentException("Volume must be between 0 and 100");
        }
        session.setVolume(volume);
        user.sendMessage(Platform.translateColors(StorageKey.MESSAGE_CLIENT_VOLUME_CHANGED.getString()).replaceAll("__amount__", volume + ""));
        OpenAudioMc.getService(NetworkingService.class).send(this, new PacketClientSetVolume(volume));
    }

    /**
     * Close the clients web client
     */
    public void kick(Runnable callback) {
        OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> {
            OpenAudioMc.getService(NetworkingService.class).send(this, new PacketSocketKickClient());
            callback.run();
        });
    }

    /**
     * This method enables/disables moderation mode.
     * It also handles switching logic for the client, and manages the timer state.
     *
     * @param state the new state
     */
    public void setModerating(boolean state) {
        if (state) {
            session.setModerationTimeRemaining(OpenAudioMc.getInstance().getConfiguration().getInt(StorageKey.SETTINGS_MODERATION_TIMER));
            if (!session.isModerating()) {
                session.setResetVc(true);
                sendPacket(new PacketClientModerationStatus(true));
            }
            session.setModerating(true);
        } else {
            session.setModerating(false);
            session.setModerationTimeRemaining(0);
            session.setResetVc(true);
            sendPacket(new PacketClientModerationStatus(false));
        }
    }

    public void sendMedia(Media media) {
        if (media.getKeepTimeout() != -1 && !session.getOngoingMedia().contains(media)) {
            session.getOngoingMedia().add(media);

            // stop after x seconds
            OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> session.getOngoingMedia().remove(media), (20 * media.getKeepTimeout()));
        }
        if (isConnected()) {
            sendPacket(new PacketClientCreateMedia(media));
        } else {
            session.bumpConnectReminder();
        }
    }

    public void sendPacket(AbstractPacket packet) {
        OpenAudioMc.getService(NetworkingService.class).send(this, packet);
    }

    public void onDestroy() {
        this.getRtcSessionManager().makePeersDrop();
        OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> OpenAudioMc.getService(ClientDataService.class).save(dataCache, user.getUniqueId()));
        OpenAudioMc.getService(ClientDataService.class).dropFromCache(user.getUniqueId());
    }

    @Override
    public User<?> getOwner() {
        return this.getUser();
    }

    @Override
    public ClientAuth getAuth() {
        return auth;
    }

    @Override
    public void handleError(MediaError error, String source) {
        EventApi.getInstance().callEvent(new MediaErrorEvent(this, source, error));
        if (this.getUser().isAdministrator() && OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_STAFF_TIPS)) {
            String prefix = MagicValue.COMMAND_PREFIX.get(String.class);
            this.getUser().sendMessage(prefix + "Something went wrong while playing a sound for you, here's what we know:");
            this.getUser().sendMessage(prefix + "what happened: " + error.getExplanation());
            this.getUser().sendMessage(prefix + "where: " + source);
            this.getUser().sendMessage(prefix + Platform.makeColor("YELLOW") + "Players do NOT receive this warning, only staff does. You can disable it in the config.");
        }
    }

    @Override
    public Actor getActor() {
        return getOwner();
    }

    @Override
    public boolean isConnected() {
        return this.session.isConnected();
    }

    @Override
    public boolean hasVoicechatEnabled() {
        return this.rtcSessionManager.isReady();
    }

    @Override
    public boolean isMicrophoneMuted() {
        return !this.rtcSessionManager.isMicrophoneEnabled();
    }

    @Override
    public void onConnect(Runnable runnable) {
        addOnConnectHandler(runnable);
    }

    @Override
    public void sendMedia(com.craftmend.openaudiomc.generic.media.objects.Media media) {
        sendMedia(media);
    }

    @Override
    public void onDisconnect(Runnable runnable) {
        addOnDisconnectHandler(runnable);
    }

    @Override
    public int getVolume() {
        return session.getVolume();
    }

    @Override
    public boolean isMicrophoneActive() {
        return this.isConnected() && this.getRtcSessionManager().isReady() && this.getRtcSessionManager().isMicrophoneEnabled();
    }

    @Override
    public void forcefullyDisableMicrophone(boolean disabled) {
        this.getRtcSessionManager().preventSpeaking(disabled);
    }

    @Override
    public boolean isModerating() {
        return session.isModerating();
    }

    @Override
    public void playMedia(@NotNull Media media) {
        sendMedia(media);
    }

    @Override
    public void kickProximityPeer(@NotNull Client otherClient) {
        if (this.rtcSessionManager.isPeer(otherClient.getActor().getUniqueId())) {
            // remove the peer
            ClientConnection other = (ClientConnection) otherClient;
            this.rtcSessionManager.getCurrentProximityPeers().remove(other.getActor().getUniqueId());
            this.getPeerQueue().drop(other.getRtcSessionManager().getStreamKey());
        }
    }

    @Override
    public void preloadMedia(String source) {
        ClientPreFetchPayload payload = new ClientPreFetchPayload(OpenAudioMc.getService(MediaService.class).process(source), "api", false, false);
        sendPacket(new PacketClientPreFetch(payload));
    }

}
