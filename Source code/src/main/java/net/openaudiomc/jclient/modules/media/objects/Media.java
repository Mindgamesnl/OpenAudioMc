package net.openaudiomc.jclient.modules.media.objects;

import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.modules.socket.enums.PacketCommand;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;

import net.openaudiomc.jclient.utils.UrlFetcher;
import org.json.JSONObject;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioSystem;
import java.io.File;
import java.io.FileInputStream;
import java.util.Map;

public class Media {
    
    private String source;
    private JSONObject tags = new JSONObject();
    private Boolean hasTag;
    private PacketCommand command = PacketCommand.PLAY;
    private Boolean syncronized = false;
    
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

    public Media setStartingPoint(Integer start) {
        this.hasTag = true;
        this.command = PacketCommand.PLAY_SPECIAL;
        try {
            this.tags.put("start", start);
        } catch (Exception e) {}
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

    public OaPacket getHandle(AudioListener listener) {
        OaPacket p = new OaPacket();
        p.setPlayer(listener);

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
