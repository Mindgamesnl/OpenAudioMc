package com.craftmend.openaudiomc.spigot.services.world;

import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import org.bukkit.Location;
import org.bukkit.entity.Player;
import org.bukkit.util.Vector;
import java.io.Serializable;

public class Vector3 implements Serializable {
    public static final Vector3 EMPTY = new Vector3();
    private double x = 0;
    private double y = 0;
    private double z = 0;

    public static Vector3 from(ClientConnection peer) {
        Player player = (Player) peer.getUser().getOriginal();
        return from(player.getLocation());
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Vector3)) return false;
        Vector3 otherVector = (Vector3) other;
        return x == otherVector.getX() && y == otherVector.getY() && z == otherVector.getZ();
    }

    public Vector toBukkit() {
        return new Vector(x, y, z);
    }

    public static Vector3 from(Location location) {
        return new Vector3(location.getX(), location.getY(), location.getZ());
    }

    public static Vector3 from(MappedLocation location) {
        return new Vector3(location.getX(), location.getY(), location.getZ());
    }

    public double getX() {
        return this.x;
    }

    public double getY() {
        return this.y;
    }

    public double getZ() {
        return this.z;
    }

    public Vector3() {
    }

    public Vector3(final double x, final double y, final double z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
