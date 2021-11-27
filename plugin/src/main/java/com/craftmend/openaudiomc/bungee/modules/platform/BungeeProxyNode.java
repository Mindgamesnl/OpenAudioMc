package com.craftmend.openaudiomc.bungee.modules.platform;

import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.BungeeUserAdapter;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketPlayer;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.config.ServerInfo;
import net.md_5.bungee.api.connection.ProxiedPlayer;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
public class BungeeProxyNode implements ProxyNode {

    private ServerInfo serverInfo;

    @Override
    public String getName() {
        return serverInfo.getName();
    }

    @Override
    public Collection<User> getOnlineUsers() {
        List<User> users = new ArrayList<>();
        for (ProxiedPlayer player : ProxyServer.getInstance().getPlayers()) {
            if (player.getServer() != null && player.getServer().getInfo().getName().equals(serverInfo)) {
                users.add(new BungeeUserAdapter(player));
            }
        }
        return users;
    }

    @Override
    public void sendPacket(StandardPacket packet) {
        for (User onlineUser : getOnlineUsers()) {
            // send packet
            OpenAudioMcBungee.getInstance().getMessageHandler().sendPacket(
                    new PacketPlayer((ProxiedPlayer) onlineUser.getOriginal()), packet
            );
            return;
        }
    }
}
