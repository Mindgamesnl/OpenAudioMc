package com.craftmend.openaudiomc.modules.players.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.media.objects.Media;
import com.craftmend.openaudiomc.modules.networking.packets.PacketClientCreateMedia;
import com.craftmend.openaudiomc.modules.networking.packets.PacketClientDestroyMedia;
import com.craftmend.openaudiomc.modules.networking.packets.PacketSocketKickClient;

import com.craftmend.openaudiomc.modules.regions.objects.RegionPropperties;
import lombok.Getter;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.entity.Player;

import java.util.*;

public class Client {

    //spigot
    @Getter private Player player;

    //socket
    @Getter private Boolean isConnected = false;
    @Getter private String pin = "1234"; //TODO: generate pins

    //optional regions
    private List<String> currentRegions = new ArrayList<>();


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
    }

    public void onQuit() {
        kick();
    }

    public void kick() {
        OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketSocketKickClient());
    }

    public void sendMedia(Media media) {
        OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketClientCreateMedia(media));
    }

    public void tickRegions() {
        if (OpenAudioMc.getInstance().getRegionModule() != null) {
            //regions are enabled
            List<String> detectedRegions = OpenAudioMc.getInstance().getRegionModule().getRegions(player.getLocation());

            List<String> enteredRegions = new ArrayList<>(detectedRegions);
            enteredRegions.removeAll(currentRegions);

            List<String> leftRegions = new ArrayList<>(currentRegions);
            leftRegions.removeAll(detectedRegions);

            enteredRegions.forEach(entered -> {
                RegionPropperties regionPropperties = OpenAudioMc.getInstance().getRegionModule().getPropperties(entered);
                sendMedia(regionPropperties.getMedia());
            });

            leftRegions.forEach(exited -> {
                RegionPropperties regionPropperties = OpenAudioMc.getInstance().getRegionModule().getPropperties(exited);
                OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketClientDestroyMedia(regionPropperties.getMedia().getMediaId()));
            });

            currentRegions = detectedRegions;
        }
    }

    public void onDisconnect() {
        this.isConnected = false;
        player.sendMessage("disconnected");
    }
}
