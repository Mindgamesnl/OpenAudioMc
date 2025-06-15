package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import com.craftmend.openaudiomc.api.speakers.Loc;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.World;
import org.bukkit.block.Block;

public class MappedLocation implements Loc {
    private int x;
    private int y;
    private int z;
    private String world;

    public MappedLocation(Location location) {
        this.x = location.getBlockX();
        this.y = location.getBlockY();
        this.z = location.getBlockZ();
        this.world = location.getWorld().getName();
    }

    public Location toBukkit() {
        return new Location(Bukkit.getWorld(this.world), this.x, this.y, this.z);
    }

    public Block getBlock() {
        World world = Bukkit.getWorld(this.world);
        if (world != null) return world.getBlockAt(this.x, this.y, this.z);
        return null;
    }

    public static MappedLocation fromBukkit(Location location) {
        return new MappedLocation(location.getBlockX(), location.getBlockY(), location.getBlockZ(), location.getWorld().getName());
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof MappedLocation) {
            MappedLocation other = (MappedLocation) obj;
            return other.x == x && other.y == y && other.z == z && other.world.equals(world);
        }
        return false;
    }

    public Loc toApiLoc() {
        return this;
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + x;
        result = 31 * result + y;
        result = 31 * result + z;
        result = 31 * result + (world != null ? world.hashCode() : 0);
        return result;
    }

    public int getX() {
        return this.x;
    }

    public int getY() {
        return this.y;
    }

    public int getZ() {
        return this.z;
    }

    public String getWorld() {
        return this.world;
    }

    public void setX(final int x) {
        this.x = x;
    }

    public void setY(final int y) {
        this.y = y;
    }

    public void setZ(final int z) {
        this.z = z;
    }

    public void setWorld(final String world) {
        this.world = world;
    }

    @Override
    public String toString() {
        return "MappedLocation(x=" + this.getX() + ", y=" + this.getY() + ", z=" + this.getZ() + ", world=" + this.getWorld() + ")";
    }

    public MappedLocation(final int x, final int y, final int z, final String world) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.world = world;
    }
}
