package com.craftmend.openaudiomc.spigot.modules.proxy.service;

import com.craftmend.openaudiomc.generic.networking.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingService;
import com.craftmend.openaudiomc.generic.node.packets.ForwardSocketPacket;
import com.craftmend.openaudiomc.generic.player.SpigotPlayerAdapter;
import com.craftmend.openaudiomc.generic.voice.packets.subtypes.RoomMember;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.listeners.BungeePacketListener;
import com.ikeirnez.pluginmessageframework.PacketPlayer;
import com.ikeirnez.pluginmessageframework.implementations.BukkitPacketManager;
import lombok.Getter;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.entity.Player;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.*;
import java.util.function.Consumer;

public class ProxyNetworkingService extends INetworkingService {

    @Getter private Set<INetworkingEvents> eventHandlers = new HashSet<>();
    private NetworkingService realService = new NetworkingService();
    private BukkitPacketManager packetManager;

    public ProxyNetworkingService() {
        packetManager = new BukkitPacketManager(OpenAudioMcSpigot.getInstance(), "openaudiomc:node");
        packetManager.registerListener(new BungeePacketListener());
    }

    @Override
    public void connectIfDown() throws URISyntaxException, IOException {
        // unused in fake system
    }

    @Override
    public void send(ClientConnection client, AbstractPacket packet) {
        // handle packet if it should be passed to bungee
        // forward every packet starting with PacketClient
        if (packet.getClass().getSimpleName().startsWith("PacketClient")) {
            for (INetworkingEvents event : getEvents()) event.onPacketSend(client, packet);
            packet.setClient(client.getPlayer().getUniqueId());
            Player player = ((SpigotPlayerAdapter) client.getPlayer()).getPlayer();
            packetManager.sendPacket(new PacketPlayer(player), new ForwardSocketPacket(packet));
        }
    }

    @Override
    public void triggerPacket(AbstractPacket abstractPacket) {
        // unused in fake system
    }

    @Override
    public ClientConnection getClient(UUID uuid) {
        return realService.getClient(uuid);
    }

    @Override
    public Collection<ClientConnection> getClients() {
        return realService.getClients();
    }

    @Override
    public void remove(UUID player) {
        realService.remove(player);
    }

    @Override
    public ClientConnection register(Player player) {
        return realService.register(player);
    }

    @Override
    public ClientConnection register(ProxiedPlayer player) {
        return realService.register(player);
    }

    @Override
    public void stop() {
        // unused in fake system
    }

    @Override
    public void requestRoomCreation(List<RoomMember> members, Consumer<Boolean> wasSucessful) {
        // unused in fake system
    }


    @Override
    public Set<INetworkingEvents> getEvents() {
        return eventHandlers;
    }

    @Override
    public void addEventHandler(INetworkingEvents events) {
        eventHandlers.add(events);
    }
}
