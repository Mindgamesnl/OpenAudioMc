package com.craftmend.openaudiomc.generic.plus.tasks;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.loggin.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.plus.PlusService;
import com.craftmend.openaudiomc.generic.plus.object.PlusPlayer;
import com.craftmend.openaudiomc.generic.plus.updates.PlayerUpdatePayload;
import com.craftmend.openaudiomc.generic.rest.RestRequest;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class PlayerSynchroniser implements Runnable {

    private Set<UUID> trackedPlayers = new HashSet<>();
    private OpenAudioMc main;

    public PlayerSynchroniser(PlusService service, OpenAudioMc main) {
        this.main = main;
        deleteAll();

        // is it enabled? No? Then dont start the task
        if (!service.isPlusEnabled()) return;
        if (main.isSlave()) return;

        // update 10 seconds
        int timeout = 20 * 5;
        main.getTaskProvider().scheduleAsyncRepeatingTask(this, timeout, timeout);
    }

    public void deleteAll() {
        PlayerUpdatePayload playerUpdatePayload = new PlayerUpdatePayload(main.getAuthenticationService().getServerKeySet().getPrivateKey().getValue());
        playerUpdatePayload.setForceClear(true);
        update(playerUpdatePayload);
        trackedPlayers.clear();
    }

    @Override
    public void run() {
        PlayerUpdatePayload playerUpdatePayload = new PlayerUpdatePayload(main.getAuthenticationService().getServerKeySet().getPrivateKey().getValue());
        Set<UUID> trackBackup = new HashSet<>(trackedPlayers);
        Set<UUID> currentPlayers = new HashSet<>();
        for (ClientConnection client : main.getNetworkingService().getClients()) {
            if (!trackedPlayers.contains(client.getPlayer().getUniqueId())) {
                // not tracked yet!
                playerUpdatePayload.getPlusPlayers().add(new PlusPlayer(client.getPlayer().getName(), client.getPlayer().getUniqueId(), client.getSession().getKey(), client.getIsConnected()));
            }
            currentPlayers.add(client.getPlayer().getUniqueId());

            if (client.isSessionUpdated()) {
                client.setSessionUpdated(false);
                playerUpdatePayload.getStateUpdated().add(new PlusPlayer(client.getPlayer().getUniqueId(), client.getIsConnected()));
            }
        }

        // old ones
        trackBackup.removeAll(currentPlayers);
        for (UUID uuid : trackBackup) {
            // players that should be dropped
            playerUpdatePayload.getOfflinePlayers().add(uuid);
            trackedPlayers.remove(uuid);
        }

        // If there's something to do then do the thing ye
        if (!playerUpdatePayload.getStateUpdated().isEmpty() || !playerUpdatePayload.getOfflinePlayers().isEmpty() || !playerUpdatePayload.getPlusPlayers().isEmpty()) {
            // trigger update
            update(playerUpdatePayload);
            for (PlusPlayer plusPlayer : playerUpdatePayload.getPlusPlayers()) {
                trackedPlayers.add(plusPlayer.getUuid());
            }
        }
    }

    private void update(PlayerUpdatePayload playerUpdatePayload) {
        RestRequest restRequest = new RestRequest("/api/v1/plus/players");
        restRequest.setBody(OpenAudioMc.getGson().toJson(playerUpdatePayload));
        restRequest.execute().thenAccept(response -> {
            if (!response.getErrors().isEmpty()) {
                OpenAudioLogger.toConsole("Warning, the server returned an error while updating player states!");
            }
        });
    }
}
