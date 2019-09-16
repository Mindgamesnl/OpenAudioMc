package com.craftmend.openaudiomc.generic.networking.interfaces;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.voice.packets.subtypes.RoomMember;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.entity.Player;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;

public interface INetworkingService {

    void connectIfDown() throws URISyntaxException, IOException;
    void send(ClientConnection client, AbstractPacket packet);
    void triggerPacket(AbstractPacket abstractPacket);
    ClientConnection getClient(UUID uuid);
    Collection<ClientConnection> getClients();
    void remove(UUID player);
    ClientConnection register(Player player);
    ClientConnection register(ProxiedPlayer player);
    void stop();
    void requestRoomCreation(List<RoomMember> members, Consumer<Boolean> wasSucessful);

}
