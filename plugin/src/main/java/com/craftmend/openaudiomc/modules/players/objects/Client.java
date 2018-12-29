package com.craftmend.openaudiomc.modules.players.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.media.objects.Media;
import com.craftmend.openaudiomc.modules.networking.packets.PacketClientCreateMedia;
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

    //streaming
    private List<Media> mediaList = new ArrayList<>();


    public Client(Player player) {
        this.player = player;
    }

    public void publishUrl() {
        this.pin = UUID.randomUUID().toString().subSequence(0, 3).toString();
        StringBuilder urlBuilder = new StringBuilder();
        urlBuilder.append(player.getName());
        urlBuilder.append(":");
        urlBuilder.append(player.getUniqueId().toString());
        urlBuilder.append(":");
        urlBuilder.append(OpenAudioMc.getInstance().getAuthenticationModule().getServerKeySet().getPublicKey().getValue());
        urlBuilder.append(":");
        urlBuilder.append(pin);

        String token = new String(Base64.getEncoder().encode(urlBuilder.toString().getBytes()));

        TextComponent message = new TextComponent("Click here for a quick test or so");
        message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, "http://craftmend.com/oatest/?&data=" + token));
        player.spigot().sendMessage(message);
    }

    public void onConnect() {
        this.isConnected = true;
        Bukkit.getScheduler().runTaskLater(OpenAudioMc.getInstance(), () -> {
            player.sendMessage("connected! hei");

            //send all current playing songs
            mediaList.forEach(cachedMedia -> OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketClientCreateMedia(cachedMedia)));

            //for testing!
            if (mediaList.size() == 0) {
                Media media = new Media("https://craftmend.com/a.mp3");
                media.setLoop(true);
                media.setClient(this);
                media.setDoPickup(true);
                playMedia(media);
            }
        }, 20 * 2);
    }

    public void onQuit() {

    }

    public void playMedia(Media media) {
        if (media.getDoPickup()) {
            mediaList.add(media);
        }
        player.sendMessage("starting media first time");
        OpenAudioMc.getInstance().getNetworkingModule().send(this, new PacketClientCreateMedia(media));
    }

    public void onDisconnect() {
        this.isConnected = false;
        player.sendMessage("connected! hei");
    }
}
