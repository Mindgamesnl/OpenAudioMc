package com.craftmend.openaudiomc.generic.plus.tasks;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.plus.PlusService;
import com.craftmend.openaudiomc.generic.state.states.ConnectedState;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class PlayerSynchroniser implements Runnable {

    private Set<UUID> trackedPlayers = new HashSet<>();
    private OpenAudioMc main;

    public PlayerSynchroniser(PlusService service, OpenAudioMc main) {
        // is it enabled? No? Then dont start the task
        if (!main.getOAConfiguration().getBoolean(StorageKey.PLUS_SYNC_PLAYERS)) return;

        // update every minute
        int timeout = 20 * 60;
        main.getTaskProvider().scheduleAsyncRepeatingTask(this::run, timeout, timeout);
    }

    @Override
    public void run() {
        if (!(main.getStateService().getCurrentState() instanceof ConnectedState)) return;

        Set<UUID> trackBackup = new HashSet<>(trackedPlayers);
        Set<UUID> currentPlayers = new HashSet<>();
        for (ClientConnection client : main.getNetworkingService().getClients()) {
            if (!trackedPlayers.contains(client.getPlayer().getUniqueId())) {
                // not tracked yet!
            }
            currentPlayers.add(client.getPlayer().getUniqueId());
        }

        // old ones
        trackBackup.removeAll(currentPlayers);
        for (UUID uuid : trackBackup) {
            // players that should be dropped
        }
    }
}
