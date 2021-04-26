package com.craftmend.openaudiomc.bungee.modules.node;

import com.craftmend.openaudiomc.api.impl.event.events.TimeServiceUpdateEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.bungee.modules.node.listeners.NodePacketListener;
import com.craftmend.openaudiomc.generic.node.packets.ServerUpdateTimePacket;
import com.craftmend.openaudiomc.velocity.messages.PacketManager;
import com.craftmend.openaudiomc.velocity.messages.PacketPlayer;
import com.craftmend.openaudiomc.velocity.messages.implementations.BungeeCordPacketManager;
import lombok.Getter;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.connection.ProxiedPlayer;

import java.util.HashMap;

public class NodeManager {

    @Getter private PacketManager packetManager;

    public NodeManager(OpenAudioMcBungee openAudioMcBungee) {
        packetManager = new BungeeCordPacketManager(openAudioMcBungee, "openaudiomc:node");
        packetManager.registerListener(new NodePacketListener());

        AudioApi.getInstance().getEventDriver()
                .on(TimeServiceUpdateEvent.class)
                .setHandler((service) -> {
                    // get all servers that have online players, and forward
                    // a packet to them

                    HashMap<String, ProxiedPlayer> coveredServers = new HashMap<>();
                    for (ProxiedPlayer player : ProxyServer.getInstance().getPlayers()) {
                        if (!coveredServers.containsKey(player.getServer().getInfo().getName())) {
                            coveredServers.put(player.getServer().getInfo().getName(), player);
                        }
                    }

                    ServerUpdateTimePacket packet = new ServerUpdateTimePacket(service.getTimeService());

                    coveredServers.forEach((server, player) -> {
                        OpenAudioMcBungee.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(player), packet);
                    });
                });
    }

}
