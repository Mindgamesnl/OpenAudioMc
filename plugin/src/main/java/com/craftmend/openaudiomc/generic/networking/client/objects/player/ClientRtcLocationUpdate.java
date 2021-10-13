package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.generic.networking.payloads.client.speakers.objects.Vector3;
import com.craftmend.openaudiomc.generic.player.SpigotPlayerAdapter;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.services.world.interfaces.IRayTracer;
import com.craftmend.openaudiomc.spigot.services.world.tracing.EstimatedRayTracer;
import lombok.AllArgsConstructor;
import org.bukkit.Location;
import org.bukkit.entity.Player;

@AllArgsConstructor
public class ClientRtcLocationUpdate {

    private static final boolean PROCESS_OBSTRUCTIONS = StorageKey.SETTINGS_VC_PROCESS_OBSTRUCTIONS.getBoolean();
    private static final IRayTracer rayTracer = new EstimatedRayTracer();

    private String streamKey;
    private double x, y, z;
    private int obstructions;

    public static ClientRtcLocationUpdate fromClientWithLocation(ClientConnection clientConnection, Location source, Vector3 targetLocation) {
        int obstructions = 0;

        if (PROCESS_OBSTRUCTIONS) {
            // check line-of-sight
            obstructions = rayTracer.obstructionsBetweenLocations(
                    source,
                    targetLocation
            );

        }

        return new ClientRtcLocationUpdate(
                clientConnection.getStreamKey(),
                source.getX(),
                source.getY(),
                source.getZ(),
                obstructions
        );
    }

    public static ClientRtcLocationUpdate fromClient(ClientConnection clientConnection, Vector3 targetLocation) {
        Player player = ((SpigotPlayerAdapter) clientConnection.getPlayer()).getPlayer();

        int obstructions = 0;

        if (PROCESS_OBSTRUCTIONS) {
            // check line-of-sight
            obstructions = rayTracer.obstructionsBetweenLocations(
                    player.getLocation(),
                    targetLocation
            );

        }

        return new ClientRtcLocationUpdate(
                clientConnection.getStreamKey(),
                player.getLocation().getX(),
                player.getLocation().getY(),
                player.getLocation().getZ(),
                obstructions
        );
    }

}
