package com.craftmend.openaudiomc.velocity.messages.bungeecord;

import com.craftmend.openaudiomc.velocity.messages.PacketWriter;
import com.craftmend.openaudiomc.velocity.messages.RawPacket;

import java.io.IOException;

/**
 * Created by iKeirNez on 01/01/14, ported to velocity and modified by fluse1367 on 11/2020.
 */
public class PacketConnect extends RawPacket {

    public String server;

    public PacketConnect(String server){
        super("BungeeCord");
        this.server = server;
    }

    @Override
    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF("Connect");
        packetWriter.writeUTF(server);
        return packetWriter;
    }
}
