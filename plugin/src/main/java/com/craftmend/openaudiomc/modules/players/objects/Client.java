package com.craftmend.openaudiomc.modules.players.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.media.objects.Media;
import com.craftmend.openaudiomc.modules.media.objects.MediaUpdate;
import com.craftmend.openaudiomc.modules.networking.packets.PacketClientCreateMedia;
import com.craftmend.openaudiomc.modules.networking.packets.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.modules.networking.packets.PacketClientUpdateMedia;
import com.craftmend.openaudiomc.modules.networking.packets.PacketSocketKickClient;
import com.craftmend.openaudiomc.modules.regions.objects.IRegion;
import com.craftmend.openaudiomc.modules.speakers.objects.ApplicableSpeaker;

import lombok.Getter;
import lombok.Setter;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;

import java.net.URISyntaxException;
import java.util.*;

public class Client {

    //spigot
    @Getter private Player player;

    //socket
    @Getter private Boolean isConnected = false;
    @Getter private String pin = "1234"; //TODO: generate pins

    //optional regions and speakers
    private List<IRegion> currentRegions = new ArrayList<>();
    private List<ApplicableSpeaker> currentSpeakers = new ArrayList<>();

    //ongoing sounds
    private List<Media> ongoingMedia = new ArrayList<>();

    //plugin data
    @Setter @Getter private String selectedSpeakerSource = null;


    public Client(Player player) {
        this.player = player;
        if (OpenAudioMc.getInstance().getConfig().getBoolean("options.send-on-join")) publishUrl();
    }

    public void publishUrl() {
        try {
            OpenAudioMc.getInstance().getNetworkingModule().connectIfDown();
        } catch (URISyntaxException e) {
            player.sendMessage(OpenAudioMc.getLOG_PREFIX() + "Failed to execute goal.");
            e.printStackTrace();
        }
        this.pin = UUID.randomUUID().toString().subSequence(0, 3).toString();
        TextComponent message = new TextComponent(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("messages.click-to-connect")));
        message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL,
                OpenAudioMc.getInstance().getConfigurationModule().getDataConfig().getString("keyset.base-url") + new TokenFactory().build(this)));
        player.spigot().sendMessage(message);
    }

    public void onConnect() {
        this.isConnected = true;
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("messages.client-opened")));
        currentRegions.clear();
        currentSpeakers.clear();
        Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMc.getInstance(), () -> ongoingMedia.forEach(this::sendMedia), 20);
    }

    public void onDisconnect() {
        this.isConnected = false;
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("messages.client-closed")));
    }

    public void onQuit() {
        kick();
    }

    private void kick() {
        OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketSocketKickClient());
    }

    public void sendMedia(Media media) {
        if (media.getKeepTimeout() != -1 && !ongoingMedia.contains(media)) {
            ongoingMedia.add(media);
            Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMc.getInstance(), () -> ongoingMedia.remove(media), 20 * media.getKeepTimeout());
        }
        if (isConnected) OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketClientCreateMedia(media));
    }

    public void tickSpeakers() {
        List<ApplicableSpeaker> applicableSpeakers = new ArrayList<>(OpenAudioMc.getInstance().getSpeakerModule().getApplicableSpeakers(player.getLocation()));

        List<ApplicableSpeaker> enteredSpeakers = new ArrayList<>(applicableSpeakers);
        enteredSpeakers.removeIf(speaker -> containsSpeaker(currentSpeakers, speaker));

        List<ApplicableSpeaker> leftSpeakers = new ArrayList<>(currentSpeakers);
        leftSpeakers.removeIf(speaker -> containsSpeaker(applicableSpeakers, speaker));

        enteredSpeakers.forEach(entered -> {
            if (!isPlayingSpeaker(entered)) {
                OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketClientCreateMedia(entered.getSpeaker().getMedia(), entered.getDistance(), entered.getSpeaker().getRadius()));
            }
        });

        currentSpeakers.forEach(current -> {
            if (containsSpeaker(applicableSpeakers, current)) {
                ApplicableSpeaker selector = filterSpeaker(applicableSpeakers, current);
                if (selector != null && (current.getDistance() != selector.getDistance())) {
                    MediaUpdate mediaUpdate = new MediaUpdate(selector.getDistance(), selector.getSpeaker().getRadius(), 450, current.getSpeaker().getMedia().getMediaId());
                    OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketClientUpdateMedia(mediaUpdate));
                }
            }
        });

        leftSpeakers.forEach(left -> OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketClientDestroyMedia(left.getSpeaker().getMedia().getMediaId())));

        currentSpeakers = applicableSpeakers;
    }

    public void tickRegions() {
        if (OpenAudioMc.getInstance().getRegionModule() != null) {
            //regions are enabled
            List<IRegion> detectedRegions = OpenAudioMc.getInstance().getRegionModule().getRegions(player.getLocation());

            List<IRegion> enteredRegions = new ArrayList<>(detectedRegions);
            enteredRegions.removeIf(t -> containsRegion(currentRegions, t));

            List<IRegion> leftRegions = new ArrayList<>(currentRegions);
            leftRegions.removeIf(t -> containsRegion(detectedRegions, t));

            List<IRegion> takeOverMedia = new ArrayList<>();
            enteredRegions.forEach(entered -> {
                if (!isPlayingRegion(entered)) {
                    sendMedia(entered.getMedia());
                } else {
                    takeOverMedia.add(entered);
                }
            });

            leftRegions.forEach(exited -> {
                if (!containsRegion(takeOverMedia, exited)) {
                    OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketClientDestroyMedia(exited.getMedia().getMediaId()));
                }
            });

            currentRegions = detectedRegions;
        }
    }

    private Boolean isPlayingRegion(IRegion region) {
        for (IRegion r : currentRegions) if (region.getMedia().getSource().equals(r.getMedia().getSource())) return true;
        return false;
    }

    private Boolean isPlayingSpeaker(ApplicableSpeaker speaker) {
        for (ApplicableSpeaker currentSpeaker : currentSpeakers) if (currentSpeaker.getSpeaker().getSource().equals(speaker.getSpeaker().getSource())) return true;
        return false;
    }

    private ApplicableSpeaker filterSpeaker(List<ApplicableSpeaker> list, ApplicableSpeaker query) {
        for (ApplicableSpeaker applicableSpeaker : list) {
            if (applicableSpeaker.getSpeaker() == query.getSpeaker()) return applicableSpeaker;
        }
        return null;
    }

    private Boolean containsSpeaker(List<ApplicableSpeaker> list, ApplicableSpeaker speaker) {
        for (ApplicableSpeaker currentSpeaker : list) if (currentSpeaker.getSpeaker().getSource().equals(speaker.getSpeaker().getSource())) return true;
        return false;
    }

    private Boolean containsRegion(List<IRegion> list, IRegion query) {
        for (IRegion r : list) if (query.getMedia().getSource().equals(r.getMedia().getSource())) return true;
        return false;
    }
}
