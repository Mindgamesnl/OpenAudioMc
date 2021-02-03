package com.craftmend.openaudiomc.generic.craftmend.tasks;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.objects.ServerKeySet;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.craftmend.object.OnlinePlayer;
import com.craftmend.openaudiomc.generic.craftmend.updates.PlayerUpdatePayload;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.ConfigurationImplementation;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class PlayerStateStreamer implements Runnable {

    private Set<UUID> trackedPlayers = new HashSet<>();
    private OpenAudioMc main;
    @Getter private boolean isRunning = false;

    public PlayerStateStreamer(CraftmendService service, OpenAudioMc main) {
        this.main = main;

        // is it enabled? No? Then dont start the task
        if (main.getInvoker().isNodeServer()) return;
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();
        if (!config.getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) return;

        deleteAll(true);

        isRunning = true;

        // update every 5 seconds
        int timeout = 20 * 5;
        main.getTaskProvider().scheduleAsyncRepeatingTask(this, timeout, timeout);
    }

    public void deleteAll(boolean sync) {
        ServerKeySet set = main.getAuthenticationService().getServerKeySet();
        PlayerUpdatePayload playerUpdatePayload = new PlayerUpdatePayload(set.getPrivateKey().getValue(), set.getPublicKey().getValue());
        if (playerUpdatePayload.getPrivateKey() == null) return;
        playerUpdatePayload.setForceClear(true);
        update(playerUpdatePayload, sync);
        trackedPlayers.clear();
    }

    @Override
    public void run() {
        ServerKeySet set = main.getAuthenticationService().getServerKeySet();
        PlayerUpdatePayload playerUpdatePayload = new PlayerUpdatePayload(set.getPrivateKey().getValue(), set.getPublicKey().getValue());
        Set<UUID> trackBackup = new HashSet<>(trackedPlayers);
        Set<UUID> currentPlayers = new HashSet<>();


        for (ClientConnection client : main.getNetworkingService().getClients()) {
            if (!trackedPlayers.contains(client.getPlayer().getUniqueId())) {
                // not tracked yet!
                playerUpdatePayload.getJoinedPlayers().add(
                        new OnlinePlayer(client.getPlayer().getName(), client.getPlayer().getUniqueId(), client.getSession().getWebSessionKey(), client.getIsConnected())
                );
            }
            currentPlayers.add(client.getPlayer().getUniqueId());

            if (client.isSessionUpdated()) {
                client.setSessionUpdated(false);
                playerUpdatePayload.getUpdatedPlayers().add(
                        new OnlinePlayer(client.getPlayer().getUniqueId(), client.getIsConnected())
                );
            }
        }

        // old ones
        trackBackup.removeAll(currentPlayers);
        for (UUID uuid : trackBackup) {
            // players that should be dropped
            playerUpdatePayload.getDisconnectedPlayers().add(uuid);
            trackedPlayers.remove(uuid);
        }

        // If there's something to do then do the thing ye
        if (!playerUpdatePayload.getDisconnectedPlayers().isEmpty() || !playerUpdatePayload.getUpdatedPlayers().isEmpty() || !playerUpdatePayload.getJoinedPlayers().isEmpty()) {
            // trigger update
            update(playerUpdatePayload, false);
            for (OnlinePlayer onlinePlayer : playerUpdatePayload.getJoinedPlayers()) {
                trackedPlayers.add(onlinePlayer.getUuid());
            }
        }
    }

    private void update(PlayerUpdatePayload playerUpdatePayload, boolean sync) {
        RestRequest restRequest = new RestRequest(RestEndpoint.ACCOUNT_UPDATE_PLAYERS);
        restRequest.setBody(playerUpdatePayload);
        if (sync) {
            restRequest.executeInThread();
            return;
        }

        restRequest.executeAsync().thenAccept(response -> {
            if (!response.getErrors().isEmpty()) {
                OpenAudioLogger.toConsole("Warning, the server returned an error while updating player states!");
            }
        });
    }
}
