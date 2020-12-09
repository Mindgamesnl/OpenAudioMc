package com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects;

import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bukkit.Location;
import org.bukkit.util.Vector;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Vector3 {

    private double x = 0;
    private double y = 0;
    private double z = 0;

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
        return new Vector3(
                location.getX(),
                location.getY(),
                location.getZ()
        );
    }

    public static Vector3 from(MappedLocation location) {
        return new Vector3(
                location.getX(),
                location.getY(),
                location.getZ()
        );
    }
}
