package com.craftmend.openaudiomc.generic.proxy.messages.implementations;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.utils.BungeeUtils;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketManager;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketPlayer;
import net.md_5.bungee.ServerConnection;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.connection.ProxiedPlayer;
import net.md_5.bungee.api.connection.Server;
import net.md_5.bungee.api.event.PluginMessageEvent;
import net.md_5.bungee.api.event.PostLoginEvent;
import net.md_5.bungee.api.plugin.Listener;
import net.md_5.bungee.api.plugin.Plugin;
import net.md_5.bungee.event.EventHandler;

/**
 * Created by iKeirNez on 24/12/13, ported to velocity and modified by fluse1367 on 11/2020.
 */
public class BungeeCordPacketManager extends PacketManager implements Listener {

    public BungeeCordPacketManager(Plugin bungeePlugin, String channel){
        super(channel);
        bungeePlugin.getProxy().getPluginManager().registerListener(bungeePlugin, this);
        bungeePlugin.getProxy().registerChannel(channel);
    }

    @Override
    protected void sendPluginMessage(PacketPlayer packetPlayer, String channel, byte[] bytes) {
        if (packetPlayer.getBungeePlayer().getServer() == null) {
            if (OpenAudioMc.BUILD.IS_TESTING) {
                OpenAudioLogger.warn("Couldn't send bungee packet because the user isn't on a server");
            }
            return;
        }

        packetPlayer.getBungeePlayer().getServer().sendData(channel, bytes);
    }

    @Override
    protected int getPlayerCount() {
        return ProxyServer.getInstance().getPlayers().size();
    }

    @Override
    protected PacketPlayer getRandomPlayer() {
        return getPlayerCount() > 0 ? new PacketPlayer(ProxyServer.getInstance().getPlayers().iterator().next()) : null;
    }

    @EventHandler
    public void onPluginMessage(PluginMessageEvent e){
        String channel = e.getTag();

        if (channel.equals(getChannel())){
            e.setCancelled(true);

            if (e.getSender() instanceof Server){ // prevents players faking a plugin message
                ProxiedPlayer proxiedPlayer = (ProxiedPlayer) e.getReceiver();
                dispatchIncomingPacket(new PacketPlayer(proxiedPlayer), e.getData());
            }
        }
    }

    @EventHandler
    public void onPlayerJoin(PostLoginEvent e){
        if (getPlayerCount() == 1){
            playerJoined(new PacketPlayer(e.getPlayer()));
        }
    }
}
