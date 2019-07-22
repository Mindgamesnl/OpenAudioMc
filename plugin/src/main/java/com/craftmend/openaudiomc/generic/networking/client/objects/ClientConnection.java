package com.craftmend.openaudiomc.generic.networking.client.objects;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.generic.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.generic.media.objects.Media;
import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.craftmend.openaudiomc.generic.networking.packets.PacketClientApplyHueColor;
import com.craftmend.openaudiomc.generic.networking.packets.PacketClientCreateMedia;
import com.craftmend.openaudiomc.generic.networking.packets.PacketClientSetVolume;
import com.craftmend.openaudiomc.generic.networking.packets.PacketSocketKickClient;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.objects.HueState;
import com.craftmend.openaudiomc.generic.objects.SerializedHueColor;
import lombok.Getter;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
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
    @Getter protected Boolean isConnected = false;
    @Getter protected Session session;

    // player implementation
    @Getter private PlayerContainer player;

    public ClientConnection(PlayerContainer playerContainer) {
        this.player = playerContainer;
        refreshSession();
    }

    public void publishUrl() {
        if (isConnected) {
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', Objects.requireNonNull(
                    OpenAudioMcCore.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_CLIENT_ALREADY_CONNECTED)
            )));
            return;
        }

        try {
            OpenAudioMcCore.getInstance().getNetworkingService().connectIfDown();
        } catch (URISyntaxException | IOException e) {
            player.sendMessage(OpenAudioMcCore.getLOG_PREFIX() + "Failed to execute goal.");
            e.printStackTrace();
        }

        String url = OpenAudioMcCore.getInstance().getConfigurationInterface().getString(StorageKey.AUTH_PUBLIC_URL) +
                session.getToken();

        TextComponent message = new TextComponent(ChatColor.translateAlternateColorCodes('&', Objects.requireNonNull(
                OpenAudioMcCore.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_CLICK_TO_CONNECT)
        )));
        message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, url));
        player.sendMessage(message);
    }

    // client connected!
    public void onConnect() {

    }

    public void refreshSession() {
        this.session = new TokenFactory().build(this);
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
        player.sendMessage(Platform.translateColors(OpenAudioMcCore.getInstance().getConfigurationInterface().getString(StorageKey.MESSAGE_CLIENT_VOLUME_CHANGED)).replaceAll("__amount__", volume + ""));
        OpenAudioMcCore.getInstance().getNetworkingService().send(this, new PacketClientSetVolume(volume));
    }

    /**
     * change the players hue lights
     *
     * @param hueState the new light state
     */
    public void setHue(HueState hueState) {
        hueState.getColorMap().forEach((light, color) -> {
            SerializedHueColor serializedHueColor = new SerializedHueColor(color.getRed(), color.getGreen(), color.getGreen(), color.getBrightness());
            OpenAudioMcCore.getInstance().getNetworkingService().send(this, new PacketClientApplyHueColor(serializedHueColor, "[" + light + "]"));
        });
    }

    /**
     * Close the clients web client
     */
    public void kick() {
        OpenAudioMcCore.getInstance().getNetworkingService().send(this, new PacketSocketKickClient());
    }

    /**
     * send media to the client to play
     *
     * @param media media to be send
     */
    public void sendMedia(Media media) {
        if (media.getKeepTimeout() != -1 && !ongoingMedia.contains(media)) {
            ongoingMedia.add(media);
            Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMcSpigot.getInstance(), () -> ongoingMedia.remove(media), 20 * media.getKeepTimeout());
        }
        if (isConnected) OpenAudioMcCore.getInstance().getNetworkingService().send(this, new PacketClientCreateMedia(media));
    }
}
