package com.craftmend.openaudiomc.bungee.modules.node;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.bungee.modules.node.listeners.NodePacketListener;
import com.ikeirnez.pluginmessageframework.PacketManager;
import com.ikeirnez.pluginmessageframework.implementations.BungeeCordPacketManager;
import lombok.Getter;

public class NodeManager {

    @Getter private PacketManager packetManager;

    public NodeManager(OpenAudioMcBungee openAudioMcBungee) {
        packetManager = new BungeeCordPacketManager(openAudioMcBungee, "OpenAudioMc-Node");
        packetManager.registerListener(new NodePacketListener());
    }

}
