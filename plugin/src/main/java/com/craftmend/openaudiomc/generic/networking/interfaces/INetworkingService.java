package com.craftmend.openaudiomc.generic.networking.interfaces;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.voice.packets.subtypes.RoomMember;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.entity.Player;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.function.Consumer;

public abstract class INetworkingService {

    public abstract void connectIfDown() throws URISyntaxException, IOException;
    public abstract void send(ClientConnection client, AbstractPacket packet);
    public abstract void triggerPacket(AbstractPacket abstractPacket);
    public abstract ClientConnection getClient(UUID uuid);
    public abstract Collection<ClientConnection> getClients();
    public abstract void remove(UUID player);
    public abstract ClientConnection register(Player player);
    public abstract ClientConnection register(ProxiedPlayer player);
    public abstract void stop();
    public abstract void requestRoomCreation(List<RoomMember> members, Consumer<Boolean> wasSucessful);
    public abstract Set<INetworkingEvents> getEvents();
    public abstract void addEventHandler(INetworkingEvents events);

}
