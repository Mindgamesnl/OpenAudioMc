package com.craftmend.openaudiomc.libs.velocitypluginmessageframework.bungeecord;

import com.craftmend.openaudiomc.libs.velocitypluginmessageframework.PacketWriter;
import com.craftmend.openaudiomc.libs.velocitypluginmessageframework.RawPacket;

import java.io.IOException;

/**
 * Created by iKeirNez on 01/01/14, ported to velocity and modified by fluse1367 on 11/2020.
 */
public class PacketConnectOther extends RawPacket {

    public String name;
    public String server;

    public PacketConnectOther(String name, String server){
        super("BungeeCord");
        this.name = name;
        this.server = server;
    }

    @Override
    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF("ConnectOther");
        packetWriter.writeUTF(name);
        packetWriter.writeUTF(server);
        return packetWriter;
    }
}
