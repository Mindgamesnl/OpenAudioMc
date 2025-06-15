package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketWriter;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import java.io.DataInputStream;
import java.io.IOException;
import java.util.UUID;

public class ClientRunAudioPacket extends StandardPacket {
    private UUID clientUuid;
    String enteredToken = null;

    public void handle(DataInputStream dataInputStream) throws IOException {
        ClientRunAudioPacket mirror = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), ClientRunAudioPacket.class);
        this.clientUuid = mirror.getClientUuid();
        this.enteredToken = mirror.getEnteredToken();
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(this));
        return packetWriter;
    }

    public ClientRunAudioPacket() {
    }

    public ClientRunAudioPacket(final UUID clientUuid, final String enteredToken) {
        this.clientUuid = clientUuid;
        this.enteredToken = enteredToken;
    }

    public UUID getClientUuid() {
        return this.clientUuid;
    }

    public String getEnteredToken() {
        return this.enteredToken;
    }
}
