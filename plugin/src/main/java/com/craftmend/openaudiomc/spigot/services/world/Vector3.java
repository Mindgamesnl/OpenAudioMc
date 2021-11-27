package com.craftmend.openaudiomc.spigot.services.world;

import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.player.adapters.SpigotUserAdapter;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bukkit.Location;
import org.bukkit.entity.Player;
import org.bukkit.util.Vector;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
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
