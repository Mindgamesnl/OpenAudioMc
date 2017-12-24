package net.openaudiomc.jclient;

import net.openaudiomc.jclient.modules.media.objects.Media;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.modules.socket.enums.PacketCommand;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

public class OpenAudioApi {

    public OpenAudioApi() {

    }

    public void play(Media m, Player p) {
        AudioListener l = OpenAudioMc.getInstance().getPlayerModule().getListeners().get(p.getName());
        l.sendPacket(m.getHandle(l));
    }

    public void play(Media m, String s) {
        for (AudioListener l : handleOpperator(s)) {
            l.sendPacket(m.getHandle(l));
        }
    }

    public void stop(Player p) {
        AudioListener l = OpenAudioMc.getInstance().getPlayerModule().getListeners().get(p.getName());
        l.sendPacket(new OaPacket().setCommand(PacketCommand.STOP));
    }

    public void stop(String s) {
        for (AudioListener l : handleOpperator(s)) {
            l.sendPacket(new OaPacket().setCommand(PacketCommand.STOP));
        }
    }

    public void stopId(Player p, String id) {
        AudioListener l = OpenAudioMc.getInstance().getPlayerModule().getListeners().get(p.getName());
        l.sendPacket(new OaPacket().setCommand(PacketCommand.STOP_SPECIAL).setValue(id));
    }

    public void stopId(String s, String id) {
        for (AudioListener l : handleOpperator(s)) {
            l.sendPacket(new OaPacket().setCommand(PacketCommand.STOP_SPECIAL).setValue(id));
        }
    }

    public void stopRegion(AudioListener listener, String region) {
        if (OpenAudioMc.getInstance().getConfig().getBoolean("storage.regions." + region + ".isRegion")) {
            stopId(listener.getPlayer(), "region_" + region);
        }
    }

    public void startRegion(AudioListener listener, String region) {
        if (OpenAudioMc.getInstance().getConfig().getBoolean("storage.regions." + region + ".isRegion")) {
            Media media = new Media(OpenAudioMc.getInstance().getConfig().getString("storage.regions." + region + ".src"));
            media.setLooping();
            media.setId("region_" + region);
            play(media, listener.getPlayer());
        }
    }

    private List<AudioListener> handleOpperator(String o) {
        List<AudioListener> list = new ArrayList<>();
        if (o.equalsIgnoreCase("@a")) {
            for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values())
                list.add(l);
        }

        if (OpenAudioMc.getInstance().getPlayerModule().getListeners().get(o) != null) {
            list.add(OpenAudioMc.getInstance().getPlayerModule().getListeners().get(o));
        }

        return list;
    }

}
