package com.craftmend.openaudiomc.api;

import com.craftmend.openaudiomc.api.clients.Client;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;
import java.util.UUID;

/**
 * The ClientApi is a collection of methods to interact with clients, and get information about them
 */
public interface ClientApi {

    /**
     * Get an instance of the client api. May be null if the plugin is not loaded yet
     * @return instance
     */
    static ClientApi getInstance() {
        if (ApiHolder.clientApiInstance == null) {
            throw new IllegalStateException("OpenAudioMc has not been initialized yet");
        }
        return ApiHolder.clientApiInstance;
    }

    /**
     * Get a client by a player UUID, or null if the player is not online or not registered yet
     * @param clientUuid the UUID of the player
     * @return the client instance, or null if the client is not connected
     */
    @Nullable Client getClient(UUID clientUuid);

    /**
     * Get all clients that are currently known to the server
     * @return All clients
     */
    @NotNull
    Collection<Client> getAllClients();

    /**
     * Check if a client is registered, and has an active web connection
     * @param uuid the UUID of the player
     * @return true if the player is connected, false if not or not registered
     */
    boolean isConnected(UUID uuid);

}
