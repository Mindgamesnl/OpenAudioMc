package com.craftmend.openaudiomc.velocity.modules.player.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.node.packets.AnnouncePlatformPacket;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.proxy.ProxyHostService;
import com.craftmend.openaudiomc.generic.user.adapters.VelocityUserAdapter;
import com.craftmend.openaudiomc.velocity.platform.VelocityProxyNode;
import com.velocitypowered.api.event.Subscribe;
import com.velocitypowered.api.event.connection.DisconnectEvent;
import com.velocitypowered.api.event.connection.PostLoginEvent;
import com.velocitypowered.api.event.player.ServerConnectedEvent;
import lombok.SneakyThrows;

public class PlayerConnectionListener {

    @SneakyThrows
    @Subscribe
    public void onPostLogin(PostLoginEvent e) {
        OpenAudioMc.getService(NetworkingService.class).register(new VelocityUserAdapter(e.getPlayer()), null);
    }

    @Subscribe
    public void onLogout(DisconnectEvent event) {
        OpenAudioMc.getService(NetworkingService.class).remove(event.getPlayer().getUniqueId());
    }

    @Subscribe
    public void onSwitch(ServerConnectedEvent event) {
        VelocityProxyNode from = null;

        if (event.getPreviousServer().isPresent()) {
            from = new VelocityProxyNode(event.getPreviousServer().get());
        }

        new VelocityProxyNode(event.getServer()).sendPacket(new AnnouncePlatformPacket(Platform.VELOCITY));

        OpenAudioMc.getService(ProxyHostService.class).onServerSwitch(
                new VelocityUserAdapter(event.getPlayer()),
                from,
                new VelocityProxyNode(event.getServer())
        );
    }

}
