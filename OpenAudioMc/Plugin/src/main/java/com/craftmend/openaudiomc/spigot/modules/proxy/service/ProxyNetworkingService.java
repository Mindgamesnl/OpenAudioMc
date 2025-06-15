package com.craftmend.openaudiomc.spigot.modules.proxy.service;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.DefaultNetworkingService;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.helpers.SerializableClient;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.node.packets.ForwardSocketPacket;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.listeners.BukkitPacketListener;

import com.craftmend.openaudiomc.generic.proxy.messages.implementations.BukkitPacketManager;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.jetbrains.annotations.Nullable;

import java.util.*;

public class ProxyNetworkingService extends NetworkingService {

    @Getter
    private final Set<INetworkingEvents> eventHandlers = new HashSet<>();
    private final DefaultNetworkingService realService = new DefaultNetworkingService();
    @Getter
    private BukkitPacketManager packetManager;
    private int packetThroughput = 0;

    public ProxyNetworkingService() {
        this.onModuleLoad();
    }

    @Override
    public void onModuleLoad() {
        packetManager = new BukkitPacketManager(OpenAudioMcSpigot.getInstance(), "openaudiomc:node");
        packetManager.registerListener(new BukkitPacketListener());

        // schedule repeating task to clear the throughput
        OpenAudioMc.resolveDependency(TaskService.class).scheduleAsyncRepeatingTask(() -> {
            packetThroughput = 0;
        }, 20, 20);
    }

    @Override
    public void connectIfDown() {
        // unused in fake system
    }

    @Override
    public void send(Authenticatable client, AbstractPacket packet) {
        for (INetworkingEvents event : getEvents()) event.onPacketSend(client, packet);

        // handle packet if it should be passed to bungee
        // forward every packet starting with PacketClient
        if (!(client instanceof ClientConnection))
            throw new UnsupportedOperationException("The bungee adapter for the networking service only supports client connections");
        if (packet.getClass().getSimpleName().startsWith("PacketClient")) {
            packet.setClient(client.getOwner().getUniqueId());
            OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(((ClientConnection) client).getUser(),
                    new ForwardSocketPacket(packet));
        }

        packetThroughput++;
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
    public boolean hasClient(UUID uuid) {
        return realService.hasClient(uuid);
    }

    @Override
    public Collection<ClientConnection> getClients() {
        return realService.getClients();
    }

    @Override
    public int getThroughputPerSecond() {
        return packetThroughput;
    }

    @Override
    public boolean isReal() {
        return false;
    }

    @Override
    public void remove(UUID player) {
        realService.remove(player);
    }

    @Override
    public void stop() {
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

    @Override
    public ClientConnection register(User player, @Nullable SerializableClient importData) {
        return realService.register(player, importData);
    }
}
