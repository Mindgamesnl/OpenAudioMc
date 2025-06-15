package com.craftmend.openaudiomc.api.basic;

import java.util.UUID;

/**
 * An actor is a further abstraction of a User from within OpenAudioMc.
 * A user is an object representing a platform specific user whose type is given as a parameter to the user class itself.
 * An actor is a more abstract version of this, and is used to represent any user, regardless of platform.
 */
public interface Actor {

    /**
     * Get the name of the actor (usually the player name)
     * @return the name of the actor
     */
    String getName();

    /**
     * Get the unique id of the actor (usually the player uuid)
     * @return the unique id of the actor
     */
    UUID getUniqueId();

    /**
     * If the actor is an administrator (usually a player with OP if we're running on a spigot host, otherwise determined by the platform)
     * @return if the actor is an administrator
     */
    boolean isAdministrator();

    /**
     * Check if the actor has a certain permission node. This uses the underlying platform's permission system if available.
     * @param permissionNode the permission node to check for
     * @return if the actor has the permission node
     */
    boolean hasPermission(String permissionNode);

    /**
     * Make the actor execute a command. This is usually a wrapper around the platform's command sender system.
     */
    void sendMessage(String message);

}
