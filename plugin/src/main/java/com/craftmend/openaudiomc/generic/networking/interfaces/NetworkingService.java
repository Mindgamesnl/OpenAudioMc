package com.craftmend.openaudiomc.generic.networking.interfaces;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.entity.Player;

import java.util.Collection;
import java.util.Set;
import java.util.UUID;

public abstract class NetworkingService {

    public abstract void connectIfDown();
    public abstract void send(Authenticatable client, AbstractPacket packet);
    public abstract void triggerPacket(AbstractPacket abstractPacket);
    public abstract void remove(UUID player);
    public abstract void stop();
    public abstract void addEventHandler(INetworkingEvents events);
    public abstract ClientConnection register(Player player);
    public abstract ClientConnection register(ProxiedPlayer player);
    public abstract ClientConnection register(com.velocitypowered.api.proxy.Player player);
    public abstract Set<INetworkingEvents> getEvents();
    public abstract ClientConnection getClient(UUID uuid);
    public abstract Collection<ClientConnection> getClients();

}
