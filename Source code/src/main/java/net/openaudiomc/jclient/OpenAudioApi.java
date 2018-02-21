package net.openaudiomc.jclient;

import com.sk89q.worldguard.bukkit.WGBukkit;
import com.sk89q.worldguard.protection.regions.ProtectedRegion;
import lombok.NoArgsConstructor;

import net.openaudiomc.jclient.modules.media.exceptions.InvalidColorCodeException;
import net.openaudiomc.jclient.modules.media.objects.AudioRegion;
import net.openaudiomc.jclient.modules.media.objects.AudioSpeaker;
import net.openaudiomc.jclient.modules.media.objects.HueState;
import net.openaudiomc.jclient.modules.media.objects.Media;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.modules.socket.enums.PacketCommand;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;

import org.bukkit.entity.Player;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
public class OpenAudioApi {

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
        stopId(listener.getPlayer(), "region_" + region);
    }

    public void startRegion(AudioListener listener, String region) {
        AudioRegion reg = OpenAudioMc.getInstance().getMediaModule().getRegions().get(region);
        if (reg != null) {
            reg.play(listener);
        }
    }

    public void setVolume(Player p, int volume) {
        AudioListener l = OpenAudioMc.getInstance().getPlayerModule().getListeners().get(p.getName());
        OaPacket packet = new OaPacket();
        packet.setCommand(PacketCommand.SETVOLUME);
        packet.setValue(volume + "");
        l.sendPacket(packet);
    }

    public void setVolume(AudioListener l, int volume) {
        OaPacket packet = new OaPacket();
        packet.setCommand(PacketCommand.SETVOLUME);
        packet.setValue(volume + "");
        l.sendPacket(packet);
    }

    public void stopSpeaker(AudioListener listener, String speaker) {
        stopId(listener.getPlayer(), "speaker_" + speaker);
    }

    public void startSpeaker(AudioListener l, String id, int volume) {
        AudioSpeaker s = OpenAudioMc.getInstance().getMediaModule().getSpeakerMedia().get(id);
        if (s.getMedia() != null) l.sendPacket(s.getMedia().getHandle(l, volume));
    }

    public void setSpeakerVolume(AudioListener l, String id, int volume) {
        try {
            OaPacket p = new OaPacket();
            p.setCommand(PacketCommand.SET_SPEAKER_VOLUME);
            p.setPlayer(l);
            JSONObject tags = new JSONObject();
            tags.put("id", id);
            tags.put("volume", volume);
            p.setValue(tags.toString());
            l.sendPacket(p);
        } catch (Exception THISWILLNEVERHAPPEN) {
        }
    }

    public void hueColor(String s, String rgba) throws InvalidColorCodeException {
        HueState hueState = new HueState();
        hueState.fromRgba(rgba);

        for (AudioListener a : handleOpperator(s)) {
            a.sendPacket(hueState.getHandle(a));
        }
    }

    public void hueColor(String s, int red, int blue, int green, int brightness) {
        HueState hueState = new HueState();
        hueState.setRed(red);
        hueState.setGreen(green);
        hueState.setBlue(blue);
        hueState.setBrightness(brightness);

        for (AudioListener a : handleOpperator(s)) {
            a.sendPacket(hueState.getHandle(a));
        }
    }

    public void hueColor(AudioListener l, String rgba) throws InvalidColorCodeException {
        HueState hueState = new HueState();
        hueState.fromRgba(rgba);

        l.sendPacket(hueState.getHandle(l));
    }

    public OpenAudioMc getMain() {
        return OpenAudioMc.getInstance();
    }

    public Boolean isConnected(Player player) {
        if (getMain().getPlayerModule().getListeners().get(player.getName()) != null) return getMain().getPlayerModule().getListeners().get(player.getName()).getIsConnected();
        return true;
    }

    public void hueColor(AudioListener l, int red, int blue, int green, int brightness) {
        HueState hueState = new HueState();
        hueState.setRed(red);
        hueState.setGreen(green);
        hueState.setBlue(blue);
        hueState.setBrightness(brightness);

        l.sendPacket(hueState.getHandle(l));
    }

    private List<AudioListener> handleOpperator(String o) {
        List<AudioListener> list = new ArrayList<>();
        if (o.equalsIgnoreCase("@a")) {
            for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values())
                list.add(l);
        }

        if (o.startsWith("region:")) {
            for (AudioListener l : OpenAudioMc.getInstance().getPlayerModule().getListeners().values()) {
                String id = o.replace("region:", "");
                List<String> regions = new ArrayList<String>();
                for(ProtectedRegion r : WGBukkit.getRegionManager(l.getPlayer().getWorld()).getApplicableRegions(l.getPlayer().getLocation())) {
                    regions.add(r.getId());
                }
                if (regions.contains(id)) {
                    list.add(l);
                }
            }
        }

        if (OpenAudioMc.getInstance().getPlayerModule().getListeners().get(o) != null) {
            list.add(OpenAudioMc.getInstance().getPlayerModule().getListeners().get(o));
        }

        return list;
    }

}
