package com.craftmend.openaudiomc.generic.proxy.messages;

import net.md_5.bungee.api.connection.ProxiedPlayer;
import org.bukkit.entity.Player;
import java.util.UUID;

/**
 * Represents a BungeeCord, a Velocity or Bukkit player
 * Created by iKeirNez on 12/12/13, ported to velocity and modified by fluse1367 on 11/2020.
 */
public class PacketPlayer {
    private final String name;
    private final UUID uuid;
    private ProxiedPlayer bungeePlayer = null;
    private Player bukkitPlayer = null;
    private com.velocitypowered.api.proxy.Player velocityPlayer = null;

    /**
     * Constructor used in the case of a Velocity player
     * @param velocityPlayer The Velocity player instance
     */
    public PacketPlayer(com.velocitypowered.api.proxy.Player velocityPlayer) {
        this.velocityPlayer = velocityPlayer;
        this.name = velocityPlayer.getUsername();
        this.uuid = velocityPlayer.getUniqueId();
    }

    /**
     * Constructor used in the case of a BungeeCord player
     * @param bungeePlayer The BungeeCord player instance
     */
    public PacketPlayer(ProxiedPlayer bungeePlayer) {
        this.bungeePlayer = bungeePlayer;
        this.name = bungeePlayer.getName();
        this.uuid = bungeePlayer.getUniqueId();
    }

    /**
     * Constructor used in the case of a Bukkit player
     * @param bukkitPlayer The Bukkit player instance
     */
    public PacketPlayer(Player bukkitPlayer) {
        this.bukkitPlayer = bukkitPlayer;
        this.name = bukkitPlayer.getName();
        this.uuid = bukkitPlayer.getUniqueId();
    }

    public String getName() {
        return this.name;
    }

    public UUID getUuid() {
        return this.uuid;
    }

    public ProxiedPlayer getBungeePlayer() {
        return this.bungeePlayer;
    }

    public Player getBukkitPlayer() {
        return this.bukkitPlayer;
    }

    public com.velocitypowered.api.proxy.Player getVelocityPlayer() {
        return this.velocityPlayer;
    }
}
