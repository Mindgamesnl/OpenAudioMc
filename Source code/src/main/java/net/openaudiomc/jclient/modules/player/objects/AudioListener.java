package net.openaudiomc.jclient.modules.player.objects;

import lombok.Getter;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;

import org.bukkit.ChatColor;
import org.bukkit.entity.Player;

import java.util.Base64;
import java.util.Random;

public class AudioListener {

    @Getter private Player player;
    @Getter private String token;
    @Getter private Boolean isConnected = false;

    public AudioListener(Player player) {
        this.player = player;
        updateToken();
    }

    public void sendLink() {
        String url = OpenAudioMc.getInstance().getConfig().getString("web.url");

        updateToken();

        String tokenRAW = this.player.getName() +
                ":" +
                OpenAudioMc.getInstance().getSocketModule().getKeyHolder().getPublickey() +
                ":" +
                this.token;

        url = url + "?s=" + new String(Base64.getEncoder().encode(tokenRAW.getBytes()));

        String message = "[\"\",{\"text\":\"" + ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("messages.provide_url")) + "\",\"clickEvent\":{\"action\":\"open_url\",\"value\":\"" + url + "\"}}]";
        OpenAudioMc.getInstance().getReflection().sendChatPacket(player, message);
    }


    public void onConnect() {
        isConnected = true;
        System.out.println("[OpenAudioMc-Connector] User " + player.getName() + " connected!");
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("messages.connected")));
    }

    public void onDisconnect() {
        isConnected = false;
        System.out.println("[OpenAudioMc-Connector] User " + player.getName() + " disconnected!");
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("messages.disconnected")));
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
