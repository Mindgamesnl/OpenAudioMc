package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketWriter;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import java.io.DataInputStream;
import java.io.IOException;

public class ForwardSocketPacket extends StandardPacket {
    private AbstractPacket payload;

    public void handle(DataInputStream dataInputStream) throws IOException {
        ForwardSocketPacket self = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), ForwardSocketPacket.class);
        this.payload = self.getPayload();
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(this));
        return packetWriter;
    }

    public AbstractPacket getPayload() {
        return this.payload;
    }

    public ForwardSocketPacket() {
    }

    public ForwardSocketPacket(final AbstractPacket payload) {
        this.payload = payload;
    }
}
