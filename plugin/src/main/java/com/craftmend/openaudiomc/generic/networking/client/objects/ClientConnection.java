package com.craftmend.openaudiomc.generic.networking.client.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.cards.objects.Card;
import com.craftmend.openaudiomc.generic.node.packets.ClientConnectedPacket;
import com.craftmend.openaudiomc.generic.node.packets.ClientDisconnectedPacket;
import com.craftmend.openaudiomc.generic.player.ProxiedPlayerAdapter;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.objects.ClientSettings;
import com.craftmend.openaudiomc.generic.interfaces.OAConfiguration;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.craftmend.openaudiomc.generic.networking.packets.*;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.objects.HueState;
import com.craftmend.openaudiomc.generic.objects.SerializedHueColor;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import com.ikeirnez.pluginmessageframework.PacketPlayer;
import lombok.Getter;
import lombok.Setter;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;
import net.md_5.bungee.api.connection.ProxiedPlayer;

import java.io.IOException;
import java.net.URISyntaxException;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ClientConnection {

    //ongoing sounds
    @Getter private List<Media> ongoingMedia = new ArrayList<>();

    // session info
    private boolean isConnected = false;
    @Getter private Session session;
    @Setter @Getter private Card card = null;
    @Setter @Getter private boolean isWaitingToken = false;

    // player implementation
    @Getter private PlayerContainer player;
    private Instant lastConnectPrompt = Instant.now();

    // on connect and disconnect handlers
    private List<Runnable> connectHandlers = new ArrayList<>();
    private List<Runnable> disconnectHandlers = new ArrayList<>();

    public ClientConnection(PlayerContainer playerContainer) {
        this.player = playerContainer;
        refreshSession();

        if (OpenAudioMc.getInstance().getOAConfiguration().getBoolean(StorageKey.SETTINGS_SEND_URL_ON_JOIN))
            publishUrl();
    }

    public void publishUrl() {
        // cancel if the player is via bungee because bungee should handle it
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.NODE) return;

        if (isConnected) {
            player.sendMessage(Platform.translateColors(Objects.requireNonNull(
                    OpenAudioMc.getInstance().getOAConfiguration().getString(StorageKey.MESSAGE_CLIENT_ALREADY_CONNECTED)
            )));
            return;
        }

        try {
            OpenAudioMc.getInstance().getNetworkingService().connectIfDown();
        } catch (URISyntaxException | IOException e) {
            player.sendMessage("Failed to execute goal.");
            e.printStackTrace();
        }

        String url = OpenAudioMc.getInstance().getOAConfiguration().getString(StorageKey.AUTH_PUBLIC_URL) +
                session.getToken();

        TextComponent message = new TextComponent(Platform.translateColors(Objects.requireNonNull(
                OpenAudioMc.getInstance().getOAConfiguration().getString(StorageKey.MESSAGE_CLICK_TO_CONNECT)
        )));
        message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, url));
        this.isWaitingToken = true;
        player.sendMessage(message);
    }

    // client connected!
    public void onConnect() {
        OAConfiguration OAConfiguration = OpenAudioMc.getInstance().getOAConfiguration();
        String startSound = OAConfiguration.getString(StorageKey.SETTINGS_CLIENT_START_SOUND);

        this.isConnected = true;
        this.isWaitingToken = false;

        ClientSettings settings = new ClientSettings().load();
        if (!settings.equals(new ClientSettings())) {
            OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketClientPushSettings(settings));
        }

        OpenAudioMc.getInstance().getTaskProvider().schduleSyncDelayedTask(
                () -> {
                    ongoingMedia.forEach(this::sendMedia);
                    // if a start sound is configured, send it
                    if (startSound != null && !startSound.equals("none")) {
                        sendMedia(new Media(startSound));
                    }

                    connectHandlers.forEach(a -> a.run());

                    if (card != null) {
                        OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketClientCreateCard(card));
                    }
                },
                1
        );

        // am I a bungeecord thingy? then send it to my other thingy
        if (OpenAudioMc.getInstance().getPlatform() == Platform.BUNGEE) {
            ProxiedPlayer proxiedPlayer = ((ProxiedPlayerAdapter) player).getPlayer();
            OpenAudioMcBungee.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(proxiedPlayer), new ClientConnectedPacket(player.getUniqueId()));
        }

        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.NODE) return;
        String connectedMessage = OAConfiguration.getString(StorageKey.MESSAGE_CLIENT_OPENED);
        player.sendMessage(Platform.translateColors(connectedMessage));
    }

    public void onDisconnect() {
        this.isConnected = false;
        disconnectHandlers.forEach(event -> event.run());

        // am I a bungeecord thingy? then send it to my other thingy
        if (OpenAudioMc.getInstance().getPlatform() == Platform.BUNGEE) {
            ProxiedPlayer proxiedPlayer = ((ProxiedPlayerAdapter) player).getPlayer();
            OpenAudioMcBungee.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(proxiedPlayer), new ClientDisconnectedPacket(player.getUniqueId()));
        }

        // Don't send if i'm spigot and a node
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.NODE) return;
        String message = OpenAudioMc.getInstance().getOAConfiguration().getString(StorageKey.MESSAGE_CLIENT_CLOSED);
        player.sendMessage(Platform.translateColors(message));
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
        player.sendMessage(Platform.translateColors(OpenAudioMc.getInstance().getOAConfiguration().getString(StorageKey.MESSAGE_CLIENT_VOLUME_CHANGED)).replaceAll("__amount__", volume + ""));
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
        boolean remindToConnect = OpenAudioMc.getInstance().getOAConfiguration().getBoolean(StorageKey.SETTINGS_REMIND_TO_CONNECT);

        if (remindToConnect) {
            int reminderInterval = OpenAudioMc.getInstance().getOAConfiguration().getInt(StorageKey.SETTINGS_REMIND_TO_CONNECT_INTERVAL);
            if (!getIsConnected() && (Duration.between(lastConnectPrompt, Instant.now()).toMillis() * 1000) > reminderInterval) {
                player.sendMessage(Platform.translateColors(OpenAudioMc.getInstance().getOAConfiguration().getString(StorageKey.MESSAGE_PROMPT_TO_CONNECT)));
            }
        }
    }

    public boolean getIsConnected() {
        if (OpenAudioMc.getInstance().getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.NODE) return true;
        return this.isConnected;
    }

    public boolean isConnected() {
        return getIsConnected();
    }
}
