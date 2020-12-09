package com.craftmend.openaudiomc.spigot.modules.speakers.interfaces;

import org.bukkit.Location;

public interface IRayTracer {

    // count the obstructions (walls etc) between two locations
    int obstructionsBetweenLocations(Location start, Location end);

}
