package com.craftmend.openaudiomc.api.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.impl.DefaultApi;
import com.craftmend.openaudiomc.api.impl.event.ApiEventDriver;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;
import java.util.UUID;

public interface AudioApi {

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
     * Get the internal event driver
     * @return Internal event driver
     */
    ApiEventDriver getEventDriver();

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

    /**
     * Get the registry API instance, used to hook into openaudio
     * on a low level
     * @return Registry api instance
     */
    RegistryApi getRegistryApi();

    static AudioApi getInstance() {
        return new DefaultApi();
    }
}
