package com.craftmend.openaudiomc.api.speakers;

import org.jetbrains.annotations.NotNull;

/**
 * Represents a location in the world, regardless of the server implementation
 */
public interface Loc {

    /**
     * Get the x coordinate
     * @return x
     */
    int getX();

    /**
     * Get the y coordinate
     * @return y
     */
    int getY();

    /**
     * Get the z coordinate
     * @return z
     */
    int getZ();

    /**
     * Get the world name
     * @return world
     */
    @NotNull
    String getWorld();

    /**
     * Set the x coordinate
     * @param x x
     */
    void setX(int x);

    /**
     * Set the y coordinate
     * @param y y
     */
    void setY(int y);

    /**
     * Set the z coordinate
     * @param z z
     */
    void setZ(int z);

    /**
     * Set the world name
     * @param world world
     */
    void setWorld(@NotNull String world);

}
