package com.craftmend.openaudiomc.velocity.platform;

import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketPlayer;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.VelocityUserAdapter;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.velocitypowered.api.proxy.Player;
import com.velocitypowered.api.proxy.server.RegisteredServer;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
public class VelocityUserHooks implements UserHooks {

    private OpenAudioMcVelocity velocity;

    @Override
    public Collection<ProxyNode> getNodes() {
        List<ProxyNode> nodes = new ArrayList<>();
        for (RegisteredServer allServer : velocity.getServer().getAllServers()) {
            nodes.add(new VelocityProxyNode(allServer));
        }
        return nodes;
    }

    @Override
    public Collection<User> getOnlineUsers() {
        List<User> users = new ArrayList<>();
        for (Player allPlayer : velocity.getServer().getAllPlayers()) {
            users.add(new VelocityUserAdapter(allPlayer));
        }
        return users;
    }

    @Override
    public void sendPacket(User user, StandardPacket packet) {
        OpenAudioMcVelocity.getInstance().getMessageReceiver().sendPacket(new PacketPlayer(
                (Player) user.getOriginal()
        ), packet);
    }

    @Override
    public User byUuid(UUID uuid) {
        if (velocity.getServer().getPlayer(uuid).isPresent()) {
            return new VelocityUserAdapter(velocity.getServer().getPlayer(uuid).get());
        }
        return null;
    }
}
