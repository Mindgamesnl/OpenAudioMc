package net.openaudiomc.jclient.modules.socket.objects;

import lombok.Getter;

import lombok.NoArgsConstructor;

import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.modules.socket.enums.PacketCommand;

import org.json.JSONException;
import org.json.JSONObject;

@Getter
@NoArgsConstructor
public class OaPacket {

    private PacketCommand packetCommand;
    private String value = "";
    private String player = "";

    public OaPacket setPlayer(AudioListener listener) {
        this.player = listener.getPlayer().getName();
        return this;
    }

    public OaPacket setCommand(PacketCommand pc) {
        this.packetCommand = pc;
        return this;
    }

    public OaPacket setValue(String v) {
        this.value = v;
        return this;
    }

    public String serialize() {
        JSONObject obj = new JSONObject();
        try {
            obj.put("packet_command", packetCommand.name());
            obj.put("packet_value", value.replaceAll("%name%", player));
            obj.put("packet_player", player);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return obj.toString();
    }
}
