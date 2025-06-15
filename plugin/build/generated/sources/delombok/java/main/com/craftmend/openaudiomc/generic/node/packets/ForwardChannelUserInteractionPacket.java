package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientVoiceInteractionPayload;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketWriter;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import java.io.DataInputStream;
import java.io.IOException;

public class ForwardChannelUserInteractionPacket extends StandardPacket {
    private ClientVoiceInteractionPayload payload;

    public void handle(DataInputStream dataInputStream) throws IOException {
        ForwardChannelUserInteractionPacket self = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), ForwardChannelUserInteractionPacket.class);
        this.payload = self.getPayload();
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(this));
        return packetWriter;
    }

    public ClientVoiceInteractionPayload getPayload() {
        return this.payload;
    }

    public ForwardChannelUserInteractionPacket() {
    }

    public ForwardChannelUserInteractionPacket(final ClientVoiceInteractionPayload payload) {
        this.payload = payload;
    }
}
