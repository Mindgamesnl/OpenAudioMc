package com.craftmend.openaudiomc.modules.players.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.media.objects.Media;
import com.craftmend.openaudiomc.modules.networking.packets.PacketClientCreateMedia;
import com.craftmend.openaudiomc.modules.networking.packets.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.modules.networking.packets.PacketSocketKickClient;

import com.craftmend.openaudiomc.modules.regions.objects.IRegion;
import lombok.Getter;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import java.util.*;

public class Client {

    //spigot
    @Getter private Player player;

    //socket
    @Getter private Boolean isConnected = false;
    @Getter private String pin = "1234"; //TODO: generate pins

    //optional regions
    private List<IRegion> currentRegions = new ArrayList<>();

    //ongoing sounds
    private List<Media> ongoingMedia = new ArrayList<>();


    public Client(Player player) {
        this.player = player;
    }

    public void publishUrl() {
        this.pin = UUID.randomUUID().toString().subSequence(0, 3).toString();
        TextComponent message = new TextComponent("Click here for a quick test or so");
        message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, "http://craftmend.com/oatest/?&data=" + new TokenFactory().build(this)));
        player.spigot().sendMessage(message);
    }

    public void onConnect() {
        this.isConnected = true;
        player.sendMessage("Welcome");
        currentRegions.clear();
        Bukkit.getScheduler().scheduleAsyncDelayedTask(OpenAudioMc.getInstance(), () -> ongoingMedia.forEach(this::sendMedia), 20);
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
        OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketClientCreateMedia(media));
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

    private Boolean containsRegion(List<IRegion> list, IRegion query) {
        for (IRegion r : list) if (query.getMedia().getSource().equals(r.getMedia().getSource())) return true;
        return false;
    }

    public void onDisconnect() {
        this.isConnected = false;
        player.sendMessage("disconnected");
    }
}
