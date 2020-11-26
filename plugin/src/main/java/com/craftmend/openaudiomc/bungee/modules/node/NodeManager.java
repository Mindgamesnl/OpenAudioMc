package com.craftmend.openaudiomc.bungee.modules.node;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.bungee.modules.node.listeners.NodePacketListener;
import me.fluse1367.port.com.ikeirnez.pluginmessageframework.PacketManager;
import me.fluse1367.port.com.ikeirnez.pluginmessageframework.implementations.BungeeCordPacketManager;
import lombok.Getter;

public class NodeManager {

    @Getter private PacketManager packetManager;

    public NodeManager(OpenAudioMcBungee openAudioMcBungee) {
        packetManager = new BungeeCordPacketManager(openAudioMcBungee, "openaudiomc:node");
        packetManager.registerListener(new NodePacketListener());
    }

}
