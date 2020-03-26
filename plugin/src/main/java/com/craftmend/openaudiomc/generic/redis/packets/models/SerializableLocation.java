package com.craftmend.openaudiomc.generic.redis.packets.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.Location;

@Builder(toBuilder = true)
@AllArgsConstructor
public class SerializableLocation {

    @Getter
    private double x;
    @Getter
    private double y;
    @Getter
    private double z;
    @Getter
    private float pitch;
    @Getter
    private float yaw;
    @Getter
    private String world;
    private transient Location cachedBukkit; // TRANSIENT! NEVER SERIALIZE OR I WILL FUCK YOU UP! ITS JUST A CACHE!

    public static SerializableLocation fromBukkit(Location bukkitLocation) {
        return SerializableLocation
                .builder()
                .x(bukkitLocation.getX())
                .y(bukkitLocation.getY())
                .z(bukkitLocation.getZ())
                .pitch(bukkitLocation.getPitch())
                .yaw(bukkitLocation.getYaw())
                .world(bukkitLocation.getWorld().getName())
                .build();
    }

    public Location toBukkit() {
        if (cachedBukkit != null) return cachedBukkit;
        cachedBukkit = new Location(
                Bukkit.getWorld(world),
                x,
                y,
                z,
                yaw,
                pitch
        );
        return toBukkit();
    }

}
