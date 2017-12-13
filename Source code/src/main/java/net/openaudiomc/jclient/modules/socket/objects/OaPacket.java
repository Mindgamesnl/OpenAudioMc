package net.openaudiomc.jclient.modules.socket.objects;

import lombok.Getter;
import net.openaudiomc.jclient.OpenAudioMc;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.modules.socket.enums.PacketCommand;
import net.openaudiomc.jclient.modules.socket.enums.PacketType;
import org.json.JSONException;
import org.json.JSONObject;

public class OaPacket {

    @Getter private PacketCommand packetCommand;
    @Getter private PacketType packetType;
    @Getter private String value = "";
    @Getter private String player = "";

    public OaPacket() {

    }

    public OaPacket setPlayer(AudioListener listener) {
        this.player = listener.getPlayer().getName();
        return this;
    }

    public OaPacket setCommand(PacketCommand pc) {
        this.packetCommand = pc;
        return this;
    }

    public OaPacket setType(PacketType pt) {
        this.packetType = pt;
        return this;
    }

    public OaPacket setValue(String v) {
        this.value = v;
        return this;
    }

    public String serialize() {
        JSONObject obj = new JSONObject();
        try {
            obj.put("packet_type", packetType.name());
            obj.put("packet_command", packetCommand.name());
            obj.put("packet_value", value);
            obj.put("packet_player", player);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return obj.toString();
    }

}
