package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.ikeirnez.pluginmessageframework.PacketWriter;
import com.ikeirnez.pluginmessageframework.StandardPacket;
import lombok.AllArgsConstructor;

import java.io.DataInputStream;
import java.io.IOException;

@AllArgsConstructor
public class ForwardSocketPacket extends StandardPacket {

    public AbstractPacket payload;

    public ForwardSocketPacket() {}

    public void handle(DataInputStream dataInputStream) throws IOException {
        this.payload = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), AbstractPacket.class);
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(payload));
        return packetWriter;
    }
}
