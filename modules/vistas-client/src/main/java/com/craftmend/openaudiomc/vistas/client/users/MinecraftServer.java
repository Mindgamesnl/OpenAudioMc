package com.craftmend.openaudiomc.vistas.client.users;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.vistas.client.redis.packets.WrappedProxyPacket;
import com.craftmend.openaudiomc.vistas.client.server.networking.VistasRedisServer;
import lombok.AllArgsConstructor;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
public class MinecraftServer implements ProxyNode {

    private String name;
    private UUID uuid;

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Collection<User> getOnlineUsers() {
        Set<User> users = new HashSet<>();
        for (User onlineUser : OpenAudioMc.resolveDependency(UserHooks.class).getOnlineUsers()) {
            if (onlineUser instanceof VistasUser) {
                VistasUser du = (VistasUser) onlineUser;
                if (du.getLastSeenServer() != null && du.getLastSeenServer().equals(uuid)) users.add(du);
            }
        }
        return users;
    }

    public void sendPacket(User user, StandardPacket standardPacket) {
        OpenAudioMc.getService(VistasRedisServer.class).sendPacket(new WrappedProxyPacket(
                standardPacket,
                uuid,
                user.getUniqueId()
        ), uuid);
    }

    @Override
    public void sendPacket(StandardPacket standardPacket) {
        OpenAudioMc.getService(VistasRedisServer.class).sendPacket(new WrappedProxyPacket(
                standardPacket,
                uuid,
                null
        ), uuid);
    }
}
