package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import me.fluse1367.port.com.ikeirnez.pluginmessageframework.PacketWriter;
import me.fluse1367.port.com.ikeirnez.pluginmessageframework.StandardPacket;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.DataInputStream;
import java.io.IOException;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class ClientDisconnectedPacket extends StandardPacket {

    public UUID clientUuid;

    public ClientDisconnectedPacket() {}

    public void handle(DataInputStream dataInputStream) throws IOException {
        this.clientUuid = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), UUID.class);
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(clientUuid.toString());
        return packetWriter;
    }
}
