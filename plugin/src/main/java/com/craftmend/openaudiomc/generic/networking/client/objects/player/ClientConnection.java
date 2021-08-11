package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.events.ClientConnectEvent;
import com.craftmend.openaudiomc.api.impl.event.events.ClientDisconnectEvent;
import com.craftmend.openaudiomc.api.impl.event.events.ClientErrorEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.api.interfaces.Client;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.bungee.modules.node.NodeManager;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.enviroment.GlobalConstantService;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.MediaError;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.packets.client.hue.PacketClientApplyHueColor;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientCreateMedia;
import com.craftmend.openaudiomc.generic.networking.packets.client.ui.PacketClientProtocolRevisionPacket;
import com.craftmend.openaudiomc.generic.networking.packets.client.ui.PacketClientSetVolume;
import com.craftmend.openaudiomc.generic.node.packets.ClientConnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientDisconnectedPacket;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.player.ProxiedPlayerAdapter;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.craftmend.openaudiomc.generic.networking.packets.*;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.hue.HueState;
import com.craftmend.openaudiomc.generic.hue.SerializedHueColor;

import com.craftmend.openaudiomc.generic.utils.data.RandomString;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.craftmend.openaudiomc.velocity.generic.player.VelocityPlayerAdapter;
import com.craftmend.openaudiomc.velocity.messages.PacketPlayer;
import com.velocitypowered.api.proxy.Player;
import lombok.Getter;
import lombok.Setter;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.Bukkit;

import java.time.Duration;
import java.time.Instant;
import java.util.*;

public class ClientConnection implements Authenticatable, Client {

    // ongoing sounds
    @Getter private final List<Media> ongoingMedia = new ArrayList<>();
    @Getter private final MixTracker mixTracker;
    @Getter private final Map<String, String> thirdPartyValues = new HashMap<>();
    @Getter @Setter private int apiSpeakers = 0;

    // session info
    private final Publisher sessionPublisher;
    @Getter private int volume = -1;
    private boolean isConnected = false;
    @Setter @Getter private PlayerSession session;
    @Getter private ClientRtcManager clientRtcManager;
    @Setter @Getter private String streamKey;

    @Setter @Getter private boolean isWaitingToken = false;
    @Setter @Getter private boolean sessionUpdated = false;
    @Getter @Setter private boolean hasHueLinked = false;
    @Getter @Setter private boolean isConnectedToRtc = false;

    // player implementation
    @Getter private final PlayerContainer player;
    private Instant lastConnectPrompt = Instant.now();

    // on connect and disconnect handlers
    private final List<Runnable> connectHandlers = new ArrayList<>();
    private final List<Runnable> disconnectHandlers = new ArrayList<>();

    public ClientConnection(PlayerContainer playerContainer) {
        this(playerContainer, null);
    }

    public ClientConnection(PlayerContainer playerContainer, SerializableClient fromSerialized) {
        this.player = playerContainer;
        this.mixTracker = new MixTracker();
        refreshSession();
        sessionPublisher = new Publisher(this);
        streamKey =  new RandomString(15).nextString();
        clientRtcManager = new ClientRtcManager(this);

        if (fromSerialized != null) {
            this.applySerializedSession(fromSerialized);
        }

        if (OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_SEND_URL_ON_JOIN))
            publishUrl();

        if (!OpenAudioMc.getInstance().getInvoker().isNodeServer()) {
            OpenAudioMc.getService(GlobalConstantService.class).sendNotifications(player);
        }
    }

    public void updatedVolume(int newVolume) {
        // triggers when the client changs volume
        this.volume = newVolume;
    }

    public void publishUrl() {
        sessionPublisher.startClientSession();
    }

    @Override
    public boolean isTokenCorrect(String token) {
        return getSession().getWebSessionKey().equals(token);
    }

    // client connected!
    @Override
    public void onConnect() {
        sessionUpdated = true;
        if (isConnected) return;
        Configuration Configuration = OpenAudioMc.getInstance().getConfiguration();

        this.isConnected = true;
        this.isWaitingToken = false;

        OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> {
                    OpenAudioMc.getService(NetworkingService.class).send(this, new PacketClientProtocolRevisionPacket());

                    ongoingMedia.forEach(this::sendMedia);

                    connectHandlers.forEach(a -> a.run());
                },
                3
        );

        // am I a proxy thingy? then send it to my other thingy
        switch (OpenAudioMc.getInstance().getPlatform()){
            case BUNGEE:
                ProxiedPlayer proxiedPlayer = ((ProxiedPlayerAdapter) player).getPlayer();
                OpenAudioMc.getService(NodeManager.class).getPacketManager().sendPacket(new PacketPlayer(proxiedPlayer), new ClientConnectedPacket(player.getUniqueId()));
                break;
            case VELOCITY:
                Player velocityPlayer = ((VelocityPlayerAdapter) player).getPlayer();
                OpenAudioMcVelocity.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(velocityPlayer), new ClientConnectedPacket(velocityPlayer.getUniqueId()));
                break;
        }

        AudioApi.getInstance().getEventDriver().fire(new ClientConnectEvent(this));

        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.NODE)
            return;
        if (OpenAudioMc.getInstance().getPlatform() == Platform.STANDALONE)
            return;
        String connectedMessage = Configuration.getString(StorageKey.MESSAGE_CLIENT_OPENED);
        player.sendMessage(Platform.translateColors(connectedMessage));
    }

    @Override
    public void onDisconnect() {
        if (!isConnected) return;
        sessionUpdated = true;
        apiSpeakers = 0;
        this.isConnected = false;
        this.hasHueLinked = false;
        this.isConnectedToRtc = false;
        disconnectHandlers.forEach(event -> event.run());

        // am I a proxy thingy? then send it to my other thingy
        switch (OpenAudioMc.getInstance().getPlatform()){
            case BUNGEE:
                ProxiedPlayer proxiedPlayer = ((ProxiedPlayerAdapter) player).getPlayer();
                OpenAudioMc.getService(NodeManager.class).getPacketManager().sendPacket(new PacketPlayer(proxiedPlayer), new ClientDisconnectedPacket(player.getUniqueId()));
                break;
            case VELOCITY:
                Player velocityPlayer = ((VelocityPlayerAdapter) player).getPlayer();
                OpenAudioMcVelocity.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(velocityPlayer), new ClientDisconnectedPacket(velocityPlayer.getUniqueId()));
                break;
        }

        AudioApi.getInstance().getEventDriver().fire(new ClientDisconnectEvent(this));

        // Don't send if i'm spigot and a node
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.NODE)
            return;
        if (OpenAudioMc.getInstance().getPlatform() == Platform.STANDALONE)
            return;
        String message = OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_CLIENT_CLOSED);
        player.sendMessage(Platform.translateColors(message));
        this.mixTracker.clear();
    }

    public void refreshSession() {
        this.session = new TokenFactory().build(this);
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
        player.sendMessage(Platform.translateColors(StorageKey.MESSAGE_CLIENT_VOLUME_CHANGED.getString()).replaceAll("__amount__", volume + ""));
        OpenAudioMc.getService(NetworkingService.class).send(this, new PacketClientSetVolume(volume));
    }

    /**
     * change the players hue lights
     *
     * @param hueState the new light state
     */
    public void setHue(HueState hueState) {
        hueState.getColorMap().forEach((light, color) -> {
            SerializedHueColor serializedHueColor = new SerializedHueColor(color.getRed(), color.getGreen(), color.getGreen(), color.getBrightness());
            OpenAudioMc.getService(NetworkingService.class).send(this, new PacketClientApplyHueColor(serializedHueColor, "[" + light + "]"));
        });
    }

    /**
     * Close the clients web client
     */
    public void kick() {
        OpenAudioMc.getService(NetworkingService.class).send(this, new PacketSocketKickClient());
    }

    /**
     * send media to the client to play
     *
     * @param media media to be send
     */
    public void sendMedia(Media media) {
        if (media.getKeepTimeout() != -1 && !ongoingMedia.contains(media)) {
            ongoingMedia.add(media);

            // stop after x seconds
            OpenAudioMc.resolveDependency(TaskService.class).schduleSyncDelayedTask(() -> ongoingMedia.remove(media), (20 * media.getKeepTimeout()));
        }
        if (getIsConnected()) {
            sendPacket(new PacketClientCreateMedia(media));
        } else {
            tickClient();
        }
    }

    public void sendPacket(AbstractPacket packet) {
        OpenAudioMc.getService(NetworkingService.class).send(this, packet);
    }

    public void tickClient() {
        boolean remindToConnect = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_REMIND_TO_CONNECT);

        if (remindToConnect) {
            int reminderInterval = OpenAudioMc.getInstance().getConfiguration().getInt(StorageKey.SETTINGS_REMIND_TO_CONNECT_INTERVAL);
            if (!getIsConnected() && (Duration.between(lastConnectPrompt, Instant.now()).toMillis() * 1000) > reminderInterval) {
                player.sendMessage(Platform.translateColors(OpenAudioMc.getInstance().getConfiguration().getString(StorageKey.MESSAGE_PROMPT_TO_CONNECT)));
                lastConnectPrompt = Instant.now();
            }
        }
    }

    public boolean getIsConnected() {
        return this.isConnected;
    }

    @Override
    public String getOwnerName() {
        return getPlayer().getName();
    }

    @Override
    public UUID getOwnerUUID() {
        return player.getUniqueId();
    }

    @Override
    public PlayerSession getSessionTokens() {
        return session;
    }

    @Override
    public void handleError(MediaError error, String source) {
        AudioApi.getInstance().getEventDriver().fire(new ClientErrorEvent(this, error, source));
        if (getPlayer().isAdministrator() && OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_STAFF_TIPS)) {
            String prefix = OpenAudioMc.getService(CommandService.class).getCommandPrefix();
            getPlayer().sendMessage(prefix + "Something went wrong while playing a sound for you, here's what we know:");
            getPlayer().sendMessage(prefix + "what happened: " + error.getExplanation());
            getPlayer().sendMessage(prefix + "where: " + source);
            getPlayer().sendMessage(prefix + Platform.makeColor("YELLOW") + "Players do NOT receive this warning, only staff does. You can disable it in the config.");
        }
    }

    @Override
    public boolean isConnected() {
        return getIsConnected();
    }

    @Override
    public Publisher getPublisher() {
        return sessionPublisher;
    }

    @Override
    public boolean hasSmartLights() {
        // implement other lights than hue on the client?
        return hasHueLinked;
    }

    @Override
    public Map<String, String> getKeyValue() {
        return thirdPartyValues;
    }

    @Override
    public void onConnect(Runnable runnable) {
        addOnConnectHandler(runnable);
    }

    @Override
    public void onDisconnect(Runnable runnable) {
        addOnDisconnectHandler(runnable);
    }

    @Override
    public void setHueState(HueState state) {
        if (this.isConnected && this.hasHueLinked) this.setHue(state);
    }

    @Override
    public boolean hasPhilipsHue() {
        return this.isConnected && this.hasHueLinked;
    }

    @Override
    public boolean hasRtc() {
        return this.isConnected && this.getClientRtcManager().isReady();
    }

    @Override
    public boolean isMicrophoneActive() {
        return this.isConnected && this.getClientRtcManager().isReady() && this.getClientRtcManager().isMicrophoneEnabled();
    }

    @Override
    public void forcefullyDisableMicrophone(boolean disabled) {
        this.getClientRtcManager().allowSpeaking(!disabled);
    }

    @Override
    public SerializableClient asSerializableCopy() {
        return SerializableClient.builder()
                .volume(volume)
                .isConnected(isConnected)
                .clientRtcManager(clientRtcManager)
                .streamKey(streamKey)
                .isConnectedToRtc(isConnectedToRtc)
                .hasHueLinked(hasHueLinked)
                .sessionUpdated(sessionUpdated)
                .session(session)
                .build();
    }

    @Override
    public void applySerializedSession(SerializableClient sc) {
        this.volume = sc.getVolume();
        this.clientRtcManager.setMicrophoneEnabled(sc.getClientRtcManager().isMicrophoneEnabled());
        this.streamKey = sc.getStreamKey();
        this.isConnectedToRtc = sc.isConnectedToRtc();
        this.hasHueLinked = sc.isHasHueLinked();
        this.sessionUpdated = sc.isSessionUpdated();
        this.session = sc.getSession();
        this.session.setClient(this);

        // compare the two, and fire events
        if (isConnected != sc.isConnected()) {
            if (sc.isConnected()) {
                onConnect();
            } else {
                onDisconnect();
            }
        }

        if (isConnectedToRtc) {
            if (!OpenAudioMc.getService(CraftmendService.class).is(CraftmendTag.VOICECHAT)) {
                OpenAudioMc.getService(CraftmendService.class).addTag(CraftmendTag.VOICECHAT);
            }
        }
    }

    public void onDestroy() {
        this.getClientRtcManager().makePeersDrop();
    }
}
