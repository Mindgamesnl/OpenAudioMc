package com.craftmend.openaudiomc.api.spakers;

import org.jetbrains.annotations.NotNull;

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
