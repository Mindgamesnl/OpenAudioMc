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
public class ClientUpdateRtcStatePacket extends StandardPacket {

    private UUID clientUuid;
    private String streamId;
    private boolean enabled;
    private boolean microphoneEnabled;

    public void handle(DataInputStream dataInputStream) throws IOException {
        ClientUpdateRtcStatePacket self = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), ClientUpdateRtcStatePacket.class);
        this.clientUuid = self.getClientUuid();
        this.streamId = self.getStreamId();
        this.enabled = self.isEnabled();
        this.microphoneEnabled = self.isMicrophoneEnabled();
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(this));
        return packetWriter;
    }
}
