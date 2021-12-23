package com.craftmend.openaudiomc.bungee.modules.platform;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketPlayer;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.BungeeUserAdapter;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.connection.ProxiedPlayer;

import java.util.*;

public class BungeeUserHooks implements UserHooks {

    @Override
    public Collection<ProxyNode> getNodes() {
        Map<String, ProxyNode> nodes = new HashMap<>();
        for (ProxiedPlayer player : ProxyServer.getInstance().getPlayers()) {
            if (player.getServer() != null) {
                if (!nodes.containsKey(player.getServer().getInfo().getName())) {
                    nodes.put(player.getServer().getInfo().getName(), new BungeeProxyNode(player.getServer().getInfo()));
                }
            }
        }
        return nodes.values();
    }

    @Override
    public Collection<User> getOnlineUsers() {
        List<User> users = new ArrayList<>();
        for (ProxiedPlayer player : ProxyServer.getInstance().getPlayers()) {
            if (player.getServer() != null) {
                users.add(new BungeeUserAdapter(player));
            }
        }
        return users;
    }

    @Override
    public void sendPacket(User user, StandardPacket packet) {
        OpenAudioMcBungee.getInstance().getMessageHandler().sendPacket(new PacketPlayer(
                (ProxiedPlayer) user.getOriginal()
        ), packet);
    }

    @Override
    public User byUuid(UUID uuid) {
        ProxiedPlayer p = ProxyServer.getInstance().getPlayer(uuid);
        if (p == null) return null;
        return new BungeeUserAdapter(p);
    }
}
