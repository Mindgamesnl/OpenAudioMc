package net.openaudiomc.jclient.modules.media.objects;

import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.modules.socket.enums.PacketCommand;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;

import org.bukkit.Bukkit;
import org.json.JSONObject;

public class Media {
    
    private String source;
    private JSONObject tags = new JSONObject();
    private Boolean hasTag;
    private PacketCommand command = PacketCommand.PLAY;
    private Boolean syncronized = false;
    private Long timestamp = 0L;
    private Long maxTime = 0L;
    
    public Media(String source) {
        this.source = source;
    }

    public Media setId(String id) {
        this.hasTag = true;
        this.command = PacketCommand.PLAY_SPECIAL;
        try {
            this.tags.put("id", id);
        } catch (Exception e) {}
        return this;
    }

    public Media setStartingPoint(Long start) {
        this.hasTag = true;
        this.command = PacketCommand.PLAY_SPECIAL;
        try {
            this.tags.put("start", start);
        } catch (Exception e) {}
        return this;
    }

    public Media setVolume(int volume) {
        this.hasTag = true;
        this.command = PacketCommand.PLAY_SPECIAL;
        try {
            this.tags.put("volume", volume);
        } catch (Exception e) {}
        return this;
    }

    public Media setSyncronized(Long length) {
        this.syncronized = true;
        this.maxTime = length;
        Bukkit.getScheduler().scheduleSyncRepeatingTask(OpenAudioMc.getInstance(), () -> {
            if (timestamp < maxTime) {
                timestamp++;
            } else {
                timestamp = 1L;
            }
        }, 20, 20);
        return this;
    }

    public Media setLooping() {
        this.hasTag = true;
        this.command = PacketCommand.PLAY_SPECIAL;
        try {
            this.tags.put("loop", true);
        } catch (Exception e) {}
        return this;
    }

    @Deprecated
    public Media setArgs(String args) {
        try {
            this.tags = new JSONObject(args);
        } catch (Exception e) {}
        this.hasTag = true;
        this.command = PacketCommand.PLAY_SPECIAL;
        return this;
    }

    public OaPacket getHandle(AudioListener listener, int volume) {
        OaPacket p = new OaPacket();
        p.setPlayer(listener);

        if (syncronized) {
            setStartingPoint(timestamp * 1000);
        }

        setVolume(volume);

        if (this.command == PacketCommand.PLAY) {
            p.setCommand(PacketCommand.PLAY);
            p.setValue(this.source);
            return p;
        }

        if (this.hasTag) {
            p.setCommand(PacketCommand.PLAY_SPECIAL);
            p.setValue(this.source + "--==--" + this.tags.toString());
            return p;
        }
        return null;
    }

    public OaPacket getHandle(AudioListener listener) {
        this.source = OpenAudioMc.getInstance().getApiEndpoints().youtubeEndpoint(source, listener.getPlayer().getName());

        OaPacket p = new OaPacket();
        p.setPlayer(listener);

        if (syncronized) {
            setStartingPoint(timestamp * 1000);
        }

        if (this.command == PacketCommand.PLAY) {
            p.setCommand(PacketCommand.PLAY);
            p.setValue(this.source);
            return p;
        }

        if (this.hasTag) {
            p.setCommand(PacketCommand.PLAY_SPECIAL);
            p.setValue(this.source + "--==--" + this.tags.toString());
            return p;
        }
        return null;
    }
    
}
