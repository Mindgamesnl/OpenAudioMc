package com.craftmend.openaudiomc.generic.plus.tasks;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.plus.PlusService;
import com.craftmend.openaudiomc.generic.plus.object.PlusPlayer;
import com.craftmend.openaudiomc.generic.plus.updates.PlayerUpdatePayload;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import org.bukkit.Bukkit;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class PlayerStateStreamer implements Runnable {

    private Set<UUID> trackedPlayers = new HashSet<>();
    private OpenAudioMc main;

    public PlayerStateStreamer(PlusService service, OpenAudioMc main) {
        this.main = main;

        // is it enabled? No? Then dont start the task
        if (!service.isPlusEnabled()) return;
        if (main.getInvoker().isSlave()) return;

        deleteAll(true);

        // update every 5 seconds
        int timeout = 20 * 5;
        main.getTaskProvider().scheduleAsyncRepeatingTask(this, timeout, timeout);
    }

    public void deleteAll(boolean sync) {
        PlayerUpdatePayload playerUpdatePayload = new PlayerUpdatePayload(main.getAuthenticationService().getServerKeySet().getPrivateKey().getValue());
        if (playerUpdatePayload.getPrivateKey() == null) return;
        playerUpdatePayload.setForceClear(true);
        update(playerUpdatePayload, sync);
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
            update(playerUpdatePayload, false);
            for (PlusPlayer plusPlayer : playerUpdatePayload.getPlusPlayers()) {
                trackedPlayers.add(plusPlayer.getUuid());
            }
        }
    }

    private void update(PlayerUpdatePayload playerUpdatePayload, boolean sync) {
        RestRequest restRequest = new RestRequest(RestEndpoint.ENDPOINT_PLUS_UPDATE_PLAYERS);
        restRequest.setBody(playerUpdatePayload);
        if (sync) {
            restRequest.executeSync();
            return;
        }

        restRequest.execute().thenAccept(response -> {
            if (!response.getErrors().isEmpty()) {
                OpenAudioLogger.toConsole("Warning, the server returned an error while updating player states!");
            }
        });
    }
}
