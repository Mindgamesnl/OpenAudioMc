package com.craftmend.openaudiomc.generic.node.packets;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.proxy.objects.CommandProxyPayload;
import com.craftmend.openaudiomc.api.velocitypluginmessageframework.PacketWriter;
import com.craftmend.openaudiomc.api.velocitypluginmessageframework.StandardPacket;
import lombok.AllArgsConstructor;

import java.io.DataInputStream;
import java.io.IOException;

@AllArgsConstructor
public class CommandProxyPacket extends StandardPacket {

    public CommandProxyPayload commandProxy;

    public CommandProxyPacket() {}

    public void handle(DataInputStream dataInputStream) throws IOException {
        this.commandProxy = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), CommandProxyPayload.class);
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(commandProxy));
        return packetWriter;
    }
}
