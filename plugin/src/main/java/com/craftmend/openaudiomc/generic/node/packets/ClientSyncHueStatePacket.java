package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.velocitypluginmessageframework.PacketWriter;
import com.craftmend.openaudiomc.api.velocitypluginmessageframework.StandardPacket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.DataInputStream;
import java.io.IOException;
import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ClientSyncHueStatePacket extends StandardPacket {

    private UUID clientUuid;

    public void handle(DataInputStream dataInputStream) throws IOException {
        ClientSyncHueStatePacket self = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), ClientSyncHueStatePacket.class);
        this.clientUuid = self.getClientUuid();
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(this));
        return packetWriter;
    }
}
