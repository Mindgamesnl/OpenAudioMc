package com.craftmend.openaudiomc.generic.networking.interfaces;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.SerializableClient;
import com.craftmend.openaudiomc.generic.player.User;
import com.craftmend.openaudiomc.generic.service.Service;

import org.jetbrains.annotations.Nullable;

import java.util.*;
import java.util.function.Consumer;

public abstract class NetworkingService extends Service {

    protected Map<UUID, Consumer<ClientConnection>> createdConnectionSubscribers = new HashMap<>();
    protected Map<UUID, Consumer<ClientConnection>> removedConnectionSubscribers = new HashMap<>();

    public abstract void onModuleLoad();

    @Override
    public void onEnable() {
        this.onModuleLoad();
    }

    public abstract void connectIfDown();
    public abstract void send(Authenticatable client, AbstractPacket packet);
    public abstract void triggerPacket(AbstractPacket abstractPacket);
    public abstract void remove(UUID player);
    public abstract void stop();
    public abstract void addEventHandler(INetworkingEvents events);
    public abstract ClientConnection register(User player, @Nullable SerializableClient importData);
    public abstract Set<INetworkingEvents> getEvents();
    public abstract ClientConnection getClient(UUID uuid);
    public abstract Collection<ClientConnection> getClients();
    public abstract int getThroughputPerSecond();

    public UUID subscribeToConnections(Consumer<ClientConnection> handler) {
        UUID id = UUID.randomUUID();
        createdConnectionSubscribers.put(id, handler);
        return id;
    }

    public UUID subscribeToDisconnections(Consumer<ClientConnection> handler) {
        UUID id = UUID.randomUUID();
        removedConnectionSubscribers.put(id, handler);
        return id;
    }

    public void unsubscribeClientEventHandler(UUID uuid) {
        removedConnectionSubscribers.remove(uuid);
        createdConnectionSubscribers.remove(uuid);
    }

}
