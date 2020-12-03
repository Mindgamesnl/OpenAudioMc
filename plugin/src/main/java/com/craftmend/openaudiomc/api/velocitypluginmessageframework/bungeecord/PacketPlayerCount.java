package com.craftmend.openaudiomc.api.velocitypluginmessageframework.bungeecord;

import com.craftmend.openaudiomc.api.velocitypluginmessageframework.PacketWriter;
import com.craftmend.openaudiomc.api.velocitypluginmessageframework.RawPacket;

import java.io.IOException;

/**
 * Created by iKeirNez on 01/01/14, ported to velocity and modified by fluse1367 on 11/2020.
 */
public class PacketPlayerCount extends RawPacket {

    public String server;

    public PacketPlayerCount(String server){
        super("BungeeCord");
        this.server = server;
    }

    @Override
    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF("PlayerCount");
        packetWriter.writeUTF(server);
        return packetWriter;
    }
}
