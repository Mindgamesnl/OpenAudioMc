package com.craftmend.openaudiomc.modules.players.objects;

import com.craftmend.openaudiomc.modules.media.objects.Media;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

public class Client {

    //spigot
    private Player player;

    //socket
    private Boolean isConnected = false;

    //streaming
    private List<Media> mediaList = new ArrayList<>();


    public Client(Player player) {
        this.player = player;
    }

    

}
