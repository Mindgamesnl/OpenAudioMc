package com.craftmend.openaudiomc.generic.proxy.messages.implementations;

import com.craftmend.openaudiomc.generic.proxy.messages.PacketManager;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketPlayer;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.plugin.messaging.Messenger;
import org.bukkit.plugin.messaging.PluginMessageListener;

/**
 * Created by iKeirNez on 24/12/13, ported to velocity and modified by fluse1367 on 11/2020.
 */
public class BukkitPacketManager extends PacketManager implements PluginMessageListener, Listener {

    private JavaPlugin bukkitPlugin;

    public BukkitPacketManager(JavaPlugin bukkitPlugin, String channel){
        super(channel);
        this.bukkitPlugin = bukkitPlugin;

        Messenger messenger = Bukkit.getMessenger();

        messenger.registerOutgoingPluginChannel(bukkitPlugin, channel);
        messenger.registerIncomingPluginChannel(bukkitPlugin, channel, this);
        messenger.registerIncomingPluginChannel(bukkitPlugin, "BungeeCord", this);
        messenger.registerOutgoingPluginChannel(bukkitPlugin, "BungeeCord");

        Bukkit.getPluginManager().registerEvents(this, bukkitPlugin);
    }

    @Override
    protected void sendPluginMessage(PacketPlayer packetPlayer, String channel, byte[] bytes) {
        packetPlayer.getBukkitPlayer().sendPluginMessage(bukkitPlugin, channel, bytes);
    }

    @Override
    protected int getPlayerCount() {
        return Bukkit.getOnlinePlayers().size();
    }

    @Override
    protected PacketPlayer getRandomPlayer() {
        return getPlayerCount() > 0 ? new PacketPlayer(Bukkit.getOnlinePlayers().iterator().next()) : null;
    }

    public void onPluginMessageReceived(String channel, Player player, byte[] bytes) {
        if (channel.equals(getChannel())){
            dispatchIncomingPacket(new PacketPlayer(player), bytes);
        } else if (channel.equals("BungeeCord")){
            dispatchIncomingForwardPacket(new PacketPlayer(player), bytes);
        }
    }

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent e){
        if (getPlayerCount() == 1){
            playerJoined(new PacketPlayer(e.getPlayer()));
        }
    }
}
