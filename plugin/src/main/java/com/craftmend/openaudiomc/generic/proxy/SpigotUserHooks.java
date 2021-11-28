package com.craftmend.openaudiomc.generic.proxy;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketPlayer;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.SpigotUserAdapter;
import com.craftmend.openaudiomc.spigot.modules.proxy.service.ProxyNetworkingService;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class SpigotUserHooks implements UserHooks {

    @Override
    public Collection<ProxyNode> getNodes() {
        return new ArrayList<>();
    }

    @Override
    public Collection<User> getOnlineUsers() {
        List<User> users = new ArrayList<>();
        for (Player onlinePlayer : Bukkit.getOnlinePlayers()) {
            users.add(new SpigotUserAdapter(onlinePlayer));
        }
        return users;
    }

    @Override
    public void sendPacket(User user, StandardPacket packet) {
        // do nothing
        NetworkingService ns = OpenAudioMc.getService(NetworkingService.class);
        if (ns instanceof ProxyNetworkingService) {
            ((ProxyNetworkingService) ns).getPacketManager().sendPacket(new PacketPlayer(
                    (Player) user.getOriginal()),
                    packet
            );
        }
    }

    @Override
    public User byUuid(UUID uuid) {
        Player player = Bukkit.getPlayer(uuid);
        if (player == null) return null;
        return new SpigotUserAdapter(player);
    }
}
