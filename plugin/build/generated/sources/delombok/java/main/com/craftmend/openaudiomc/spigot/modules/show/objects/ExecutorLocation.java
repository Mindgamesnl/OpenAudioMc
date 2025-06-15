package com.craftmend.openaudiomc.spigot.modules.show.objects;

import org.bukkit.Bukkit;
import org.bukkit.Location;

public class ExecutorLocation {
    private String world;
    private double x;
    private double y;
    private double z;

    public Location toBukkit() {
        return new Location(Bukkit.getWorld(world), x, y, z);
    }

    ExecutorLocation(final String world, final double x, final double y, final double z) {
        this.world = world;
        this.x = x;
        this.y = y;
        this.z = z;
    }


    public static class ExecutorLocationBuilder {
        private String world;
        private double x;
        private double y;
        private double z;

        ExecutorLocationBuilder() {
        }

        /**
         * @return {@code this}.
         */
        public ExecutorLocation.ExecutorLocationBuilder world(final String world) {
            this.world = world;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public ExecutorLocation.ExecutorLocationBuilder x(final double x) {
            this.x = x;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public ExecutorLocation.ExecutorLocationBuilder y(final double y) {
            this.y = y;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public ExecutorLocation.ExecutorLocationBuilder z(final double z) {
            this.z = z;
            return this;
        }

        public ExecutorLocation build() {
            return new ExecutorLocation(this.world, this.x, this.y, this.z);
        }

        @Override
        public String toString() {
            return "ExecutorLocation.ExecutorLocationBuilder(world=" + this.world + ", x=" + this.x + ", y=" + this.y + ", z=" + this.z + ")";
        }
    }

    public static ExecutorLocation.ExecutorLocationBuilder builder() {
        return new ExecutorLocation.ExecutorLocationBuilder();
    }

    public String getWorld() {
        return this.world;
    }

    public double getX() {
        return this.x;
    }

    public double getY() {
        return this.y;
    }

    public double getZ() {
        return this.z;
    }
}
