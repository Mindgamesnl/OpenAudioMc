package net.openaudiomc.jclient.modules.player.objects;

import lombok.Getter;
import lombok.Setter;
import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;
import org.bukkit.entity.Player;

import java.util.Random;

public class AudioListener {

    @Getter private Player player;
    @Getter private String token;
    @Getter private Boolean isConnected = false;

    public AudioListener(Player player) {
        this.player = player;
        updateToken();
    }

    public void onConnect() {
        isConnected = true;
        System.out.println("[OpenAudioMc-Connector] User " + player.getName() + " connected!");
    }

    public void onDisconnect() {
        isConnected = false;
        System.out.println("[OpenAudioMc-Connector] User " + player.getName() + " disconnected!");
    }

    public void onQuit() {

    }

    public void sendPacket(OaPacket p) {
        if (isConnected) {
            OpenAudioMc.getInstance().getSocketModule().getSocket().emit("toplayer", p.serialize());
        }
    }

    public Boolean isAllowedConnection(String key) {
        return  (!isConnected && token.equals(key));
    }

    public void updateToken() {
        char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 15; i++) {
            char c = chars[random.nextInt(chars.length)];
            sb.append(c);
        }
        String output = sb.toString();
        this.token = output;
    }

}
