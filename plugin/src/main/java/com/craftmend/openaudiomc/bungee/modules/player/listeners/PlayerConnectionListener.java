package com.craftmend.openaudiomc.bungee.modules.player.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.platform.BungeeProxyNode;
import com.craftmend.openaudiomc.bungee.utils.BungeeUtils;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.node.packets.AnnouncePlatformPacket;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.proxy.ProxyHostService;
import com.craftmend.openaudiomc.generic.user.adapters.BungeeUserAdapter;
import net.md_5.bungee.api.event.PlayerDisconnectEvent;
import net.md_5.bungee.api.event.PostLoginEvent;
import net.md_5.bungee.api.event.ServerConnectedEvent;
import net.md_5.bungee.api.event.ServerSwitchEvent;
import net.md_5.bungee.api.plugin.Listener;
import net.md_5.bungee.event.EventHandler;

/**
 * This implements all player based interactions on the bungeecord network
 * (session tracking, descriptions, packet routing and state synchronization)
 */
public class PlayerConnectionListener implements Listener {

    // We need a weird workaround here for https://github.com/SpigotMC/BungeeCord/issues/3542
    // 1.20.2+ players hava an additional configuration phase that we need to work around. So for the first event
    // we need to fire, and for the second we can mock a server switch.
    // We'll use a cache for this, with a retention of 20 seconds
    // which should be enough to cover resource pack loading but long enough to mitigate memory leaks.
    // This also means that the player might not yet be online in a server, in which case we'll have to delay the entire event or
    // outright ignore it, hoping for another one soon.

    @EventHandler
    public void onPostLogin(PostLoginEvent event) {
        if (!BungeeUtils.areEncodersReady(event.getPlayer())) {
            OpenAudioLogger.warn("Player " + event.getPlayer().getName() + " is not ready yet during postLogin, waiting for next event");
            return;
        }

        OpenAudioMc.getService(NetworkingService.class).register(new BungeeUserAdapter(event.getPlayer()), null);
    }

    @EventHandler
    public void onLogout(PlayerDisconnectEvent event) {
        OpenAudioMc.getService(NetworkingService.class).remove(event.getPlayer().getUniqueId());
    }

    @EventHandler
    public void onConnect(ServerConnectedEvent event) {
        new BungeeProxyNode(event.getServer().getInfo()).sendPacket(new AnnouncePlatformPacket(
                OpenAudioMc.getService(AuthenticationService.class).getServerKeySet().getPublicKey().getValue(),
                Platform.BUNGEE
        ));

        if (!BungeeUtils.areEncodersReady(event.getPlayer())) {
            OpenAudioLogger.warn("Player " + event.getPlayer().getName() + " is not ready yet during connectEvent, waiting for next event");
            return;
        }

        // possibly polyfill the missing client
        if (!OpenAudioMc.getService(NetworkingService.class).hasClient(event.getPlayer().getUniqueId())) {
            OpenAudioLogger.warn("Player " + event.getPlayer().getName() + "is not registered yet, forcing login during connect");
            OpenAudioMc.getService(NetworkingService.class).register(new BungeeUserAdapter(event.getPlayer()), null);
        }
    }

    @EventHandler
    public void onSwitch(ServerSwitchEvent event) {
        if (!BungeeUtils.areEncodersReady(event.getPlayer())) {
            OpenAudioLogger.warn("Player " + event.getPlayer().getName() + " is not ready yet during serverSwitch, waiting for next event");
        }

        // did we have to skip the login packet?
        if (!OpenAudioMc.getService(NetworkingService.class).hasClient(event.getPlayer().getUniqueId())) {
            OpenAudioLogger.warn("Player " + event.getPlayer().getName() + " is not registered yet, forcing login during switch");
            OpenAudioMc.getService(NetworkingService.class).register(new BungeeUserAdapter(event.getPlayer()), null);
        }

        OpenAudioMc.getService(ProxyHostService.class).onServerSwitch(
                new BungeeUserAdapter(event.getPlayer()),
                null,
                new BungeeProxyNode(event.getPlayer().getServer().getInfo())
        );
    }
}
