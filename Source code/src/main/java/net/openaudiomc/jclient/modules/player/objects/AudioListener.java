package net.openaudiomc.jclient.modules.player.objects;

import lombok.Getter;
import lombok.Setter;
import org.bukkit.entity.Player;

import java.util.Random;

public class AudioListener {

    @Getter private Player player;
    @Getter private String token;
    @Getter private Boolean isConnected = false;
    @Getter private ConnectedClient connectedClient = null;

    public AudioListener(Player player) {
        this.player = player;
        updateToken();
    }

    public void openConnection() {
        isConnected = true;
        connectedClient = new ConnectedClient(this);
    }

    public void closeConnection() {
        if (isConnected) {
            connectedClient.close();
            connectedClient = null;
        }
        isConnected = false;
    }

    public void onQuit() {

    }

    public Boolean isAllowedConnection(String key) {
        return  (!isConnected && token.equals(key));
    }

    public void updateToken() {
        char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 7; i++) {
            char c = chars[random.nextInt(chars.length)];
            sb.append(c);
        }
        String output = sb.toString();
        this.token = output;
    }

}
