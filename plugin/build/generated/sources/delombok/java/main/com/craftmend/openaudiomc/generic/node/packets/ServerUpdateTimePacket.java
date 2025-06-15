package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.media.time.TimeService;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketWriter;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import java.io.DataInputStream;
import java.io.IOException;

public class ServerUpdateTimePacket extends StandardPacket {
    private TimeService timeService;

    public void handle(DataInputStream dataInputStream) throws IOException {
        ServerUpdateTimePacket self = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), ServerUpdateTimePacket.class);
        this.timeService = self.getTimeService();
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(this));
        return packetWriter;
    }

    public TimeService getTimeService() {
        return this.timeService;
    }

    public ServerUpdateTimePacket() {
    }

    public ServerUpdateTimePacket(final TimeService timeService) {
        this.timeService = timeService;
    }
}
