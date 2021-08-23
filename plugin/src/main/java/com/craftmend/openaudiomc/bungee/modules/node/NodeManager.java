package com.craftmend.openaudiomc.bungee.modules.node;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import com.craftmend.openaudiomc.api.impl.event.events.ClientPreAuthEvent;
import com.craftmend.openaudiomc.api.impl.event.events.TimeServiceUpdateEvent;
import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.bungee.modules.node.listeners.NodePacketListener;
import com.craftmend.openaudiomc.generic.node.packets.ServerUpdateTimePacket;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.velocity.messages.PacketManager;
import com.craftmend.openaudiomc.velocity.messages.PacketPlayer;
import com.craftmend.openaudiomc.velocity.messages.implementations.BungeeCordPacketManager;
import lombok.Getter;
import lombok.NoArgsConstructor;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.connection.ProxiedPlayer;

import java.util.HashMap;

@NoArgsConstructor
public class NodeManager extends Service {

    @Getter
    private PacketManager packetManager;

    @Inject
    private OpenAudioMcBungee openAudioMcBungee;


    @Override
    public void onEnable() {
        packetManager = new BungeeCordPacketManager(openAudioMcBungee, "openaudiomc:node");
        packetManager.registerListener(new NodePacketListener());

        ApiEventDriver driver = AudioApi.getInstance().getEventDriver();
        if (driver.isSupported(TimeServiceUpdateEvent.class)) {
            driver.on(TimeServiceUpdateEvent.class)
                    .setHandler(service -> {
                        // get all servers that have online players, and forward
                        // a packet to them
                        HashMap<String, ProxiedPlayer> coveredServers = new HashMap<>();
                        for (ProxiedPlayer player : ProxyServer.getInstance().getPlayers()) {
                            if (player.getServer() == null) {
                                continue;
                            }
                            if (!coveredServers.containsKey(player.getServer().getInfo().getName())) {
                                coveredServers.put(player.getServer().getInfo().getName(), player);
                            }
                        }

                        ServerUpdateTimePacket packet = new ServerUpdateTimePacket(service.getTimeService());

                        NodeManager nodeManager = OpenAudioMc.getService(NodeManager.class);
                        if (nodeManager == null) {
                            return;
                        }

                        coveredServers.forEach((server, player) -> {
                            nodeManager.getPacketManager().sendPacket(new PacketPlayer(player), packet);
                        });
                    });
        }
    }
}
