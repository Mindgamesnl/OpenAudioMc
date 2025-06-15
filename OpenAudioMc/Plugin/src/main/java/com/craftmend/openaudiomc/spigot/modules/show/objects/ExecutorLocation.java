package com.craftmend.openaudiomc.spigot.modules.show.objects;

import lombok.Builder;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.Location;

@Getter
@Builder
public class ExecutorLocation {

    private String world;
    private double x;
    private double y;
    private double z;


    public Location toBukkit() {
        return new Location(Bukkit.getWorld(world), x, y, z);
    }

}
