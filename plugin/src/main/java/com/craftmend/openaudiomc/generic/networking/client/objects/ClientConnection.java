package com.craftmend.openaudiomc.generic.networking.client.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.generic.configuration.objects.ClientSettings;
import com.craftmend.openaudiomc.generic.interfaces.ConfigurationInterface;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.craftmend.openaudiomc.generic.networking.packets.*;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.objects.HueState;
import com.craftmend.openaudiomc.generic.objects.SerializedHueColor;

import lombok.Getter;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;

import org.bukkit.ChatColor;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ClientConnection {

    //ongoing sounds
    @Getter private List<Media> ongoingMedia = new ArrayList<>();

    // session info
    @Getter private Boolean isConnected = false;
    @Getter private Session session;

    // player implementation
    @Getter private PlayerContainer player;

    // on connect and disconnect handlers
    private List<Runnable> connectHandlers = new ArrayList<>();
    private List<Runnable> disconnectHandlers = new ArrayList<>();

    public ClientConnection(PlayerContainer playerContainer) {
        this.player = playerContainer;
        refreshSession();

        if (OpenAudioMc.getInstance().getConfigurationInterface().getBoolean(StorageKey.SETTINGS_SEND_URL_ON_JOIN))
            publishUrl();
    }

    public void publishUrl() {
        if (isConnected) {
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', Objects.requireNonNull(
                    OpenAudioMc.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_CLIENT_ALREADY_CONNECTED)
            )));
            return;
        }

        try {
            OpenAudioMc.getInstance().getNetworkingService().connectIfDown();
        } catch (URISyntaxException | IOException e) {
            player.sendMessage(OpenAudioMc.getLOG_PREFIX() + "Failed to execute goal.");
            e.printStackTrace();
        }

        String url = OpenAudioMc.getInstance().getConfigurationInterface().getString(StorageKey.AUTH_PUBLIC_URL) +
                session.getToken();

        TextComponent message = new TextComponent(ChatColor.translateAlternateColorCodes('&', Objects.requireNonNull(
                OpenAudioMc.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_CLICK_TO_CONNECT)
        )));
        message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, url));
        player.sendMessage(message);
    }

    // client connected!
    public void onConnect() {
        ConfigurationInterface configurationInterface = OpenAudioMc.getInstance().getConfigurationInterface();
        String connectedMessage = configurationInterface.getString(StorageKey.MESSAGE_CLIENT_OPENED);
        String startSound = configurationInterface.getString(StorageKey.SETTINGS_CLIENT_START_SOUND);

        player.sendMessage(Platform.translateColors(connectedMessage));
        this.isConnected = true;

        OpenAudioMc.getInstance().getTaskProvider().schduleSyncDelayedTask(
                () -> {
                    ongoingMedia.forEach(this::sendMedia);
                    // check and send settings, if any
                    ClientSettings settings = new ClientSettings().load();
                    if (!settings.equals(new ClientSettings())) {
                        OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketClientPushSettings(settings));
                    }

                    // if a start sound is configured, send it
                    if (startSound != null && !startSound.equals("none")) {
                        sendMedia(new Media(startSound));
                    }
                },
                20
        );
    }

    public void onDisconnect() {
        this.isConnected = false;
        disconnectHandlers.forEach(event -> event.run());
        String message = OpenAudioMc.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_CLIENT_CLOSED);
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
        player.sendMessage(Platform.translateColors(OpenAudioMc.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_CLIENT_VOLUME_CHANGED)).replaceAll("__amount__", volume + ""));
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
        if (isConnected)
            OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketClientCreateMedia(media));
    }

    public Boolean isConnected() {
        return getIsConnected();
    }
}
