package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketWriter;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.DataInputStream;
import java.io.IOException;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
public class ClientRunAudioPacket extends StandardPacket {

    @Getter private UUID clientUuid;

    public void handle(DataInputStream dataInputStream) throws IOException {
        ClientRunAudioPacket mirror = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), ClientRunAudioPacket.class);
        this.clientUuid = mirror.getClientUuid();
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(this));
        return packetWriter;
    }
}
