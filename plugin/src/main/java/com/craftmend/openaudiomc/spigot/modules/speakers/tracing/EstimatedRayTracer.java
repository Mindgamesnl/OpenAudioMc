package com.craftmend.openaudiomc.spigot.modules.speakers.tracing;

import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects.Vector3;
import com.craftmend.openaudiomc.spigot.modules.speakers.interfaces.IRayTracer;
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
public class EstimatedRayTracer implements IRayTracer {

    @Override
    public int obstructionsBetweenLocations(Location start, Vector3 end) {
        Set<Block> blockSet = new HashSet<>();

        Vector startVector = start.toVector();
        Vector endVector = end.toBukkit();
        double distance = startVector.distance(endVector);
        Vector vector = endVector.clone().subtract(startVector).normalize().multiply(1);

        for (double length = 0; length < distance; startVector.add(vector)) {
            blockSet.add(start.getWorld().getBlockAt(startVector.getBlockX(), startVector.getBlockY(), startVector.getBlockZ()));
            length++;
        }

        // iterate and account the oscillation between solids
        boolean wasLastSolid = false;
        int oscillations = 0;

        for (Block block : blockSet) {
            boolean isSolid = block.getType().isSolid();
            if (isSolid && !wasLastSolid) {
                oscillations++;
            }
            wasLastSolid = isSolid;
        }

        return oscillations;
    }

}
