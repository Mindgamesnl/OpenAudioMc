package net.openaudiomc.jclient.modules.player.objects;

import lombok.Getter;
import lombok.Setter;

import net.openaudiomc.jclient.OpenAudioApi;
import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;

import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.entity.Player;

import java.util.*;

public class AudioListener {

    @Getter private Player player;
    @Getter private String token;
    @Getter @Setter private String placingSpeaker = null;
    @Getter private Boolean isConnected = false;
    private OpenAudioApi api = new OpenAudioApi();
    private List<String> regions = new ArrayList<>();
    private Map<String, Integer> speakers = new HashMap<>();
    private int speakerRadius = OpenAudioMc.getInstance().getConfig().getInt("web.speaker_radius");

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

    public void updateSpeakers() {
        List<Location> near = new ArrayList<>(OpenAudioMc.getInstance().getMediaModule().getSpeakers().keySet());
        near.removeIf(l -> player.getLocation().distance(l) > this.speakerRadius);

        Map<String, Integer> nearest = new HashMap<>();

        near.forEach(l -> {
            String id = OpenAudioMc.getInstance().getMediaModule().getSpeakers().get(l);
            if (nearest.get(id) == null || (int) player.getLocation().distance(l) > nearest.get(id)) {
                nearest.put(id, (int) player.getLocation().distance(l));
            }
        });

        Set<String> updatedSpeakers = nearest.keySet();

        List<String> newSpeakers = new ArrayList<>(updatedSpeakers);
        newSpeakers.remove(speakers);

        List<String> oldSpeakers = new ArrayList<>(speakers.keySet());
        newSpeakers.remove(updatedSpeakers);

        List<String> handleSpeakers = (List<String>) updatedSpeakers;

        //update volume for all speakers
        for (String s : handleSpeakers) {
            //skip if its a new one, then it needs to be created first in the next loop and skip if volume did not change
            if (!newSpeakers.contains(s) && speakers.get(s) != ((30 / 100) * nearest.get(s))) {
                //id = s
                //volume = ((30 / 100) * nearest.get(s))
            }
        }

        //start new speakers
        for (String s : newSpeakers) {
            this.api.startSpeaker(this, s, ((30 / 100) * nearest.get(s)));
        }

        //stop old speakers
        for (String s : oldSpeakers) {
            this.api.stopSpeaker(this, s);
        }

        speakers = nearest;
    }

    public void updateRegions(List<String> c) {

        List<String> newRegions = new ArrayList<String>(c);
        newRegions.removeAll(regions);

        List<String> leftRegions = new ArrayList<String>(regions);
        leftRegions.removeAll(c);

        for (String s : newRegions) {
            api.startRegion(this, s);
        }

        for (String s : leftRegions) {
            api.stopRegion(this, s);
        }

        regions = c;
    }

    public void onConnect() {
        isConnected = true;
        this.regions.clear();
        System.out.println("[OpenAudioMc-Connector] User " + player.getName() + " connected!");
        if (OpenAudioMc.getInstance().getConfig().getString("messages.connected").equals("-")) return;
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("messages.connected")));
    }

    public void onDisconnect() {
        isConnected = false;
        System.out.println("[OpenAudioMc-Connector] User " + player.getName() + " disconnected!");
        if (OpenAudioMc.getInstance().getConfig().getString("messages.disconnected").equals("-")) return;
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', OpenAudioMc.getInstance().getConfig().getString("messages.disconnected")));
    }

    public void updateSpeaker() {

    }

    public void onQuit() {

    }

    public void sendPacket(OaPacket p) {
        if (isConnected) {
            p.setPlayer(this);
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
