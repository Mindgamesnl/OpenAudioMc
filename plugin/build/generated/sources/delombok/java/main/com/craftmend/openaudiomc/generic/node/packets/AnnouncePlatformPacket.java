package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketWriter;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import java.io.DataInputStream;
import java.io.IOException;

public class AnnouncePlatformPacket extends StandardPacket {
    private String parentPublicKey;
    private Platform platform;

    public void handle(DataInputStream dataInputStream) throws IOException {
        AnnouncePlatformPacket self = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), AnnouncePlatformPacket.class);
        this.platform = self.getPlatform();
        this.parentPublicKey = self.getParentPublicKey();
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(this));
        return packetWriter;
    }

    public String getParentPublicKey() {
        return this.parentPublicKey;
    }

    public Platform getPlatform() {
        return this.platform;
    }

    public AnnouncePlatformPacket() {
    }

    public AnnouncePlatformPacket(final String parentPublicKey, final Platform platform) {
        this.parentPublicKey = parentPublicKey;
        this.platform = platform;
    }
}
