package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.AudioEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.velocity.messages.PacketWriter;
import com.craftmend.openaudiomc.velocity.messages.StandardPacket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.DataInputStream;
import java.io.IOException;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
public class NetworkedEventPacket extends StandardPacket {

    @Getter private AudioEvent.NetworkedAudioEvent networkedAudioEvent;

    public void handle(DataInputStream dataInputStream) throws IOException {
        NetworkedEventPacket mirror = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), NetworkedEventPacket.class);
        this.networkedAudioEvent = mirror.getNetworkedAudioEvent();
        this.networkedAudioEvent.setWasReceived(true);

        // no need to call handlers, this should be enough
        AudioApi.getInstance().getEventDriver().fire(this.networkedAudioEvent);
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(this));
        return packetWriter;
    }
}
