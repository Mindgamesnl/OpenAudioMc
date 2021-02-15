package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.proxy.objects.CommandProxyPayload;
import com.craftmend.openaudiomc.api.velocitypluginmessageframework.PacketWriter;
import com.craftmend.openaudiomc.api.velocitypluginmessageframework.StandardPacket;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.DataInputStream;
import java.io.IOException;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommandProxyPacket extends StandardPacket {

    private CommandProxyPayload commandProxy;

    public void handle(DataInputStream dataInputStream) throws IOException {
        CommandProxyPacket self = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), CommandProxyPacket.class);
        this.commandProxy = self.getCommandProxy();
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(this));
        return packetWriter;
    }
}
