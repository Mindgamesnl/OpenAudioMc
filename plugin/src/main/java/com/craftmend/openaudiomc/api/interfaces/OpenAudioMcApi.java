package com.craftmend.openaudiomc.api.interfaces;

import org.jetbrains.annotations.Nullable;

import java.util.Collection;
import java.util.UUID;

public interface OpenAudioMcApi {

    /**
     * Fetch a client instance for a player by UUID.
     * Only available two ticks after joining.
     *
     * @param uuid Player UUID
     * @return Client instance
     */
    @Nullable
    Client getClient(UUID uuid);

    /**
     * Fetch all clients that are currently known to the server
     * @return All clients
     */
    Collection<Client> getAllClients();


    /**
     * Get the World Api (used for regions and speakers)
     * @return World API instance
     */
    WorldApi getWorldApi();

    /**
     * Get the media API instance (used for media management)
     * @return Media API instance
     */
    MediaApi getMediaApi();

}
