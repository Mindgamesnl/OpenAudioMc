package com.craftmend.openaudiomc.velocity.platform;

import com.craftmend.openaudiomc.generic.proxy.models.ProxyNode;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.user.adapters.VelocityUserAdapter;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketPlayer;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.velocitypowered.api.proxy.Player;
import com.velocitypowered.api.proxy.server.RegisteredServer;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
public class VelocityProxyNode implements ProxyNode {

    private RegisteredServer registeredServer;

    @Override
    public String getName() {
        return registeredServer.getServerInfo().getName();
    }

    @Override
    public Collection<User> getOnlineUsers() {
        List<User> user = new ArrayList<>();
        for (Player player : registeredServer.getPlayersConnected()) {
            user.add(new VelocityUserAdapter(player));
        }
        return user;
    }

    @Override
    public void sendPacket(StandardPacket packet) {
        for (Player player : registeredServer.getPlayersConnected()) {
            OpenAudioMcVelocity.getInstance().getMessageReceiver().sendPacket(new PacketPlayer(player), packet);
            return;
        }
    }
}
