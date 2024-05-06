package com.craftmend.openaudiomc.api.channels;

import com.craftmend.openaudiomc.api.basic.Actor;
import com.craftmend.openaudiomc.api.clients.Client;
import org.jetbrains.annotations.Nullable;

import java.util.Collection;
import java.util.UUID;

public interface VoiceChannel {

    /**
     * Get the name of the channel
     * @return the name of the channel
     */
    String getName();

    /**
     * Get the members of the channel
     * @return the members of the channel
     */
    Collection<Client> getMembers();

    /**
     * Get the creator of the channel
     * @return the creator of the channel, or null if the channel is not a user channel
     */
    @Nullable
    Actor getCreator();

    /**
     * If this channel requires permission to join
     * @return true if the channel requires permission to join
     */
    boolean requiresPermission();

    /**
     * Get the required permission to join this channel
     * @return the required permission to join this channel, or null if the channel does not require permission
     */
    @Nullable
    String getRequiredPermission();

    /**
     * Check if a client is a member of this channel
     * @param actor the actor to check
     * @return true if the actor is a member of this channel
     */
    boolean isMember(Actor actor);

    /**
     * Check if a client is a member of this channel
     * @param uuid the uuid of the actor to check
     * @return true if the actor is a member of this channel
     */
    boolean isMember(UUID uuid);

    /**
     * Check if a client would be allowed to join this channel
     * @param client the client to check
     * @return the response of the join check
     */
    ChannelJoinResponse joinPreconditionCheck(Client client);

    /**
     * Add a member to the channel
     * @param client the client to add
     */
    void addMember(Client client);

    /**
     * Remove a member from the channel
     * @param client the client to remove
     */
    void removeMember(Client client);
}
