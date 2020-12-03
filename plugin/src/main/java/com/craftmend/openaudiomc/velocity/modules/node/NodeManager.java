package com.craftmend.openaudiomc.velocity.modules.node;

import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.craftmend.openaudiomc.velocity.modules.node.listeners.NodePacketListener;
import lombok.Getter;
import com.craftmend.openaudiomc.api.velocitypluginmessageframework.implementations.VelocityPacketManager;

public class NodeManager {

    @Getter
    private final VelocityPacketManager packetManager;

    public NodeManager(OpenAudioMcVelocity openAudioMcVelocity) {
        packetManager = new VelocityPacketManager(openAudioMcVelocity, openAudioMcVelocity.getServer(),"openaudiomc:node");
        packetManager.registerListener(new NodePacketListener());
    }

}
