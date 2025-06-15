package com.craftmend.openaudiomc.spigot.services.world.tracing;

import com.craftmend.openaudiomc.spigot.services.world.Vector3;
import com.craftmend.openaudiomc.spigot.services.world.interfaces.IRayTracer;
import org.bukkit.Location;
import org.bukkit.block.Block;
import org.bukkit.util.Vector;

import java.util.HashSet;
import java.util.Set;

/**
 * Rough ray tracer that estimates paths between locations.
 * Not as precise as the FullRayTracer but a lot more efficient for longer paths.
 *
 * I'm AlReAdY TrAcEr
 */
public class DummyTracer implements IRayTracer {

    @Override
    public int obstructionsBetweenLocations(Location start, Vector3 end) {
        return 1;
    }

}
