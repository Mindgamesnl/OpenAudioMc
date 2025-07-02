package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.payloads.in.ClientVoiceInteractionPayload;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketWriter;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.DataInputStream;
import java.io.IOException;

@Getter
@NoArgsConstructor
@AllArgsConstructor
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
}
