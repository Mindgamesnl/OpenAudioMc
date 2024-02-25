package com.craftmend.openaudiomc.generic.networking.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.client.session.ClientAuth;
import com.craftmend.openaudiomc.api.media.MediaError;
import com.craftmend.openaudiomc.generic.networking.packets.PacketSocketKickClient;
import com.craftmend.openaudiomc.generic.user.User;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.entity.Player;

import java.util.UUID;

public interface Authenticatable {

    void onConnect();
    void onDisconnect();
    boolean isConnected();
    User getOwner();
    ClientAuth getAuth();
    void handleError(MediaError error, String source);

    default void kickConnection() {
        OpenAudioMc.getService(NetworkingService.class).send(this, new PacketSocketKickClient());
    }

    static Authenticatable get(Player player) {
        return get(player.getUniqueId());
    }

    static Authenticatable get(ProxiedPlayer player) {
        return get(player.getUniqueId());
    }

    static Authenticatable get(UUID uuid) {
        ClientConnection clientConnection = OpenAudioMc.getService(NetworkingService.class).getClient(uuid);
        return clientConnection;
    }

}
