package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.cards.objects.Card;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.networking.enums.MediaError;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.packets.client.card.PacketClientCreateCard;
import com.craftmend.openaudiomc.generic.networking.packets.client.hue.PacketClientApplyHueColor;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientCreateMedia;
import com.craftmend.openaudiomc.generic.networking.packets.client.ui.PacketClientProtocolRevisionPacket;
import com.craftmend.openaudiomc.generic.networking.packets.client.ui.PacketClientSetVolume;
import com.craftmend.openaudiomc.generic.node.packets.ClientConnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientDisconnectedPacket;
import com.craftmend.openaudiomc.generic.player.ProxiedPlayerAdapter;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.craftmend.openaudiomc.generic.networking.packets.*;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.hue.HueState;
import com.craftmend.openaudiomc.generic.hue.SerializedHueColor;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import com.ikeirnez.pluginmessageframework.PacketPlayer;
import lombok.Getter;
import lombok.Setter;
import net.md_5.bungee.api.ChatColor;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.HoverEvent;
import net.md_5.bungee.api.chat.TextComponent;
import net.md_5.bungee.api.connection.ProxiedPlayer;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class ClientConnection implements Authenticatable {

    // ongoing sounds
    @Getter private List<Media> ongoingMedia = new ArrayList<>();
    @Getter private MixTracker mixTracker;

    // session info
    private boolean isConnected = false;
    @Getter private PlayerSession session;
    @Setter @Getter private Card card = null;
    @Setter @Getter private boolean isWaitingToken = false;
    @Setter @Getter private boolean sessionUpdated = false;
    @Getter @Setter private boolean hasHueLinked = false;

    // player implementation
    @Getter private PlayerContainer player;
    private Instant lastConnectPrompt = Instant.now();

    // on connect and disconnect handlers
    private List<Runnable> connectHandlers = new ArrayList<>();
    private List<Runnable> disconnectHandlers = new ArrayList<>();

    public ClientConnection(PlayerContainer playerContainer) {
        this.player = playerContainer;
        this.mixTracker = new MixTracker();
        refreshSession();

        if (OpenAudioMc.getInstance().getConfigurationImplementation().getBoolean(StorageKey.SETTINGS_SEND_URL_ON_JOIN))
            publishUrl();

        if (!OpenAudioMc.getInstance().getInvoker().isSlave()) {
            OpenAudioMc.getInstance().getGlobalConstantService().sendNotifications(player);
        }
    }

    public void publishUrl() {
        // cancel if the player is via bungee because bungee should handle it
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.NODE)
            return;

        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfigurationImplementation();
        if (!config.getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            new CatchLegalBindingMiddleware().continueCommand(player.asExecutor(), null);
            return;
        }

        if (isConnected) {
            player.sendMessage(Platform.translateColors(Objects.requireNonNull(
                    config.getString(StorageKey.MESSAGE_CLIENT_ALREADY_CONNECTED)
            )));
            return;
        }

        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> OpenAudioMc.getInstance().getNetworkingService().connectIfDown());

        String url = OpenAudioMc.getInstance().getPlusService().getBaseUrl() +
                session.getToken();

        TextComponent message = new TextComponent(Platform.translateColors(Objects.requireNonNull(
                config.getString(StorageKey.MESSAGE_CLICK_TO_CONNECT)
        )));

        TextComponent[] hover = new TextComponent[] {
                new TextComponent(Platform.translateColors(Objects.requireNonNull(
                        config.getString(StorageKey.MESSAGE_HOVER_TO_CONNECT)
                )))
        };

        message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, url));
        message.setHoverEvent(new HoverEvent(HoverEvent.Action.SHOW_TEXT, hover));

        this.isWaitingToken = true;
        player.sendMessage(message);
    }

    @Override
    public boolean isTokenCorrect(String token) {
        return getSession().getKey().equals(token);
    }

    // client connected!
    @Override
    public void onConnect() {
        sessionUpdated = true;
        if (isConnected) return;
        ConfigurationImplementation ConfigurationImplementation = OpenAudioMc.getInstance().getConfigurationImplementation();

        this.isConnected = true;
        this.isWaitingToken = false;

        OpenAudioMc.getInstance().getTaskProvider().schduleSyncDelayedTask(() -> {
                    OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketClientProtocolRevisionPacket());

                    ongoingMedia.forEach(this::sendMedia);

                    connectHandlers.forEach(a -> a.run());

                    if (card != null) {
                        OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketClientCreateCard(card));
                    }
                },
                3
        );

        // am I a bungeecord thingy? then send it to my other thingy
        if (OpenAudioMc.getInstance().getPlatform() == Platform.BUNGEE) {
            ProxiedPlayer proxiedPlayer = ((ProxiedPlayerAdapter) player).getPlayer();
            OpenAudioMcBungee.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(proxiedPlayer), new ClientConnectedPacket(player.getUniqueId()));
        }

        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.NODE)
            return;
        String connectedMessage = ConfigurationImplementation.getString(StorageKey.MESSAGE_CLIENT_OPENED);
        player.sendMessage(Platform.translateColors(connectedMessage));
    }

    @Override
    public void onDisconnect() {
        if (!isConnected) return;
        sessionUpdated = true;
        this.isConnected = false;
        disconnectHandlers.forEach(event -> event.run());
        OpenAudioMc.getInstance().getPlusService().getConnectionManager().removeSessionIfPresent(this);

        // am I a bungeecord thingy? then send it to my other thingy
        if (OpenAudioMc.getInstance().getPlatform() == Platform.BUNGEE) {
            ProxiedPlayer proxiedPlayer = ((ProxiedPlayerAdapter) player).getPlayer();
            OpenAudioMcBungee.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(proxiedPlayer), new ClientDisconnectedPacket(player.getUniqueId()));
        }

        // Don't send if i'm spigot and a node
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.NODE)
            return;
        String message = OpenAudioMc.getInstance().getConfigurationImplementation().getString(StorageKey.MESSAGE_CLIENT_CLOSED);
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
        player.sendMessage(Platform.translateColors(OpenAudioMc.getInstance().getConfigurationImplementation().getString(StorageKey.MESSAGE_CLIENT_VOLUME_CHANGED)).replaceAll("__amount__", volume + ""));
        OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketClientSetVolume(volume));
    }

    /**
     * change the players hue lights
     *
     * @param hueState the new light state
     */
    public void setHue(HueState hueState) {
        hueState.getColorMap().forEach((light, color) -> {
            SerializedHueColor serializedHueColor = new SerializedHueColor(color.getRed(), color.getGreen(), color.getGreen(), color.getBrightness());
            OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketClientApplyHueColor(serializedHueColor, "[" + light + "]"));
        });
    }

    /**
     * Close the clients web client
     */
    public void kick() {
        OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketSocketKickClient());
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
            OpenAudioMc.getInstance().getTaskProvider().schduleSyncDelayedTask(() -> ongoingMedia.remove(media), (20 * media.getKeepTimeout()));
        }
        if (getIsConnected()) {
            OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketClientCreateMedia(media));
        } else {
            tickClient();
        }
    }

    public void tickClient() {
        boolean remindToConnect = OpenAudioMc.getInstance().getConfigurationImplementation().getBoolean(StorageKey.SETTINGS_REMIND_TO_CONNECT);

        if (remindToConnect) {
            int reminderInterval = OpenAudioMc.getInstance().getConfigurationImplementation().getInt(StorageKey.SETTINGS_REMIND_TO_CONNECT_INTERVAL);
            if (!getIsConnected() && (Duration.between(lastConnectPrompt, Instant.now()).toMillis() * 1000) > reminderInterval) {
                player.sendMessage(Platform.translateColors(OpenAudioMc.getInstance().getConfigurationImplementation().getString(StorageKey.MESSAGE_PROMPT_TO_CONNECT)));
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
        if (getPlayer().isAdministrator() && OpenAudioMc.getInstance().getConfigurationImplementation().getBoolean(StorageKey.SETTINGS_STAFF_TIPS)) {
            String prefix = OpenAudioMc.getInstance().getCommandModule().getCommandPrefix();
            getPlayer().sendMessage(prefix + "Something went wrong while playing a sound for you, here's what we know:");
            getPlayer().sendMessage(prefix + "what happened: " + error.getExplanation());
            getPlayer().sendMessage(prefix + "where: " + source);
            getPlayer().sendMessage(prefix + ChatColor.YELLOW + "Players do NOT receive this warning, only staff does. You can disable it in the config.");
        }
    }

    public boolean isConnected() {
        return getIsConnected();
    }
}
