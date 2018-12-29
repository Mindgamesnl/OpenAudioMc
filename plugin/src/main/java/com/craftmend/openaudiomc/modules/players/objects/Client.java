package com.craftmend.openaudiomc.modules.players.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.media.objects.Media;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public class Client {

    //spigot
    private Player player;

    //socket
    private Boolean isConnected = false;
    private String pin = "1234"; //TODO: generate pins

    //streaming
    private List<Media> mediaList = new ArrayList<>();


    public Client(Player player) {
        this.player = player;
    }

    public void publishUrl() {
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
        Bukkit.broadcastMessage("file:///mnt/ssd-prjects/github/OpenAudioMc/client/index.html?test=true&data=" + token);
        message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, "file:///mnt/ssd-prjects/github/OpenAudioMc/client/index.html?test=true&data=" + token));
        player.spigot().sendMessage(message);
    }

    public void onQuit() {

    }

}
