package me.fluse1367.port.com.ikeirnez.pluginmessageframework.bungeecord;

import me.fluse1367.port.com.ikeirnez.pluginmessageframework.PacketWriter;
import me.fluse1367.port.com.ikeirnez.pluginmessageframework.RawPacket;

import java.io.IOException;

/**
 * Created by iKeirNez on 01/01/14, ported to velocity and modified by fluse1367 on 11/2020.
 */
public class PacketMessage extends RawPacket {

    public String name;
    public String message;

    public PacketMessage(String name, String message){
        super("BungeeCord");
        this.name = name;
        this.message = message;
    }

    @Override
    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF("Message");
        packetWriter.writeUTF(name);
        packetWriter.writeUTF(message);
        return packetWriter;
    }
}
