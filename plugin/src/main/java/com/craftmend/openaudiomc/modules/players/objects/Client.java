package com.craftmend.openaudiomc.modules.players.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.api.objects.HueState;
import com.craftmend.openaudiomc.modules.configuration.objects.ClientSettings;
import com.craftmend.openaudiomc.modules.hue.objects.SerializedHueColor;
import com.craftmend.openaudiomc.modules.media.objects.Media;
import com.craftmend.openaudiomc.modules.players.handlers.RegionHandler;
import com.craftmend.openaudiomc.modules.players.handlers.SpeakerHandler;
import com.craftmend.openaudiomc.services.networking.packets.*;
import com.craftmend.openaudiomc.modules.players.events.ClientConnectEvent;
import com.craftmend.openaudiomc.modules.players.events.ClientDisconnectEvent;
import com.craftmend.openaudiomc.modules.regions.objects.IRegion;
import com.craftmend.openaudiomc.modules.speakers.objects.ApplicableSpeaker;

import lombok.Getter;
import lombok.Setter;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;

import java.util.*;

public class Client extends WebConnection {

    //optional regions and speakers
    @Setter private List<IRegion> currentRegions = new ArrayList<>();
    @Setter private List<ApplicableSpeaker> currentSpeakers = new ArrayList<>();
    @Getter private SpeakerHandler speakerHandler;
    @Getter private RegionHandler regionHandler;

    //ongoing sounds
    private List<Media> ongoingMedia = new ArrayList<>();

    //plugin data
    @Setter @Getter private String selectedSpeakerSource = null;

    /**
     * @param player client startup logic
     */
    public Client(Player player) {
        super(player);
        if (OpenAudioMc.getInstance().getConfig().getBoolean("options.send-on-join")) publishUrl();

        if (OpenAudioMc.getInstance().getRegionModule() != null) this.regionHandler = new RegionHandler(player, this);
        this.speakerHandler = new SpeakerHandler(player, this);
    }

    /**
     * player connect logic, for when authenticated.
     */
    public void onConnect() {
        this.isConnected = true;
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("messages.client-opened")));
        currentRegions.clear();
        currentSpeakers.clear();
        Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMc.getInstance(), () -> {
            ongoingMedia.forEach(this::sendMedia);
            ClientSettings settings = new ClientSettings().load();
            if (!settings.equals(new ClientSettings())) {
                OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketClientPushSettings(settings));
            }
            String startSound = OpenAudioMc.getInstance().getConfigurationModule().getMainConfig().getString("options.start-sound");
            if (startSound != null && !startSound.equals("none")) {
                playMedia(new Media(startSound));
            }
        }, 20);
        Bukkit.getServer().getPluginManager().callEvent(new ClientConnectEvent(player, this));
    }

    /**
     * player disconnect logic, if a problem with socket occurs or the client closes the web client
     */
    public void onDisconnect() {
        this.isConnected = false;
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("messages.client-closed")));
        Bukkit.getServer().getPluginManager().callEvent(new ClientDisconnectEvent(player));
    }

    /**
     * change the volume for the client
     *
     * @param volume the new volume
     */
    @Override
    public void setVolume(int volume) {
        if (volume < 0 || volume > 100) {
            throw new IllegalArgumentException("Volume must be between 0 and 100");
        }
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("messages.client-volume-change").replaceAll("__amount__", volume + "")));
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
            Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMc.getInstance(), () -> ongoingMedia.remove(media), 20 * media.getKeepTimeout());
        }
        if (isConnected) OpenAudioMc.getInstance().getNetworkingService().send(this, new PacketClientCreateMedia(media));
    }

    /**
     * Return the current token for the url. This can only be used for this session.
     *
     * @return token
     */
    @Override
    public Session getSession() {
        return session;
    }

    /**
     * @return playing media
     */
    @Override
    public List<Media> getOngoingMedia() {
        return this.ongoingMedia;
    }

    /**
     * @return regions that the player is a part of
     */
    @Override
    public List<IRegion> getRegions() {
        return currentRegions;
    }

    /**
     * @return speakers in range of the player
     */
    @Override
    public List<ApplicableSpeaker> getSpeakers() {
        return currentSpeakers;
    }

    /**
     * @param media start media for the client
     */
    @Override
    public void playMedia(Media media) {
        sendMedia(media);
    }
}
