package com.craftmend.openaudiomc.generic.redis.packets.models;

import org.bukkit.Bukkit;
import org.bukkit.Location;

public class SerializableLocation {
    private double x;
    private double y;
    private double z;
    private float pitch;
    private float yaw;
    private String world;
    private transient Location cachedBukkit; // TRANSIENT! NEVER SERIALIZE OR I WILL FUCK YOU UP! ITS JUST A CACHE!

    public static SerializableLocation fromBukkit(Location bukkitLocation) {
        return SerializableLocation.builder().x(bukkitLocation.getX()).y(bukkitLocation.getY()).z(bukkitLocation.getZ()).pitch(bukkitLocation.getPitch()).yaw(bukkitLocation.getYaw()).world(bukkitLocation.getWorld().getName()).build();
    }

    public Location toBukkit() {
        if (cachedBukkit != null) return cachedBukkit;
        cachedBukkit = new Location(Bukkit.getWorld(world), x, y, z, yaw, pitch);
        return toBukkit();
    }


    public static class SerializableLocationBuilder {
        private double x;
        private double y;
        private double z;
        private float pitch;
        private float yaw;
        private String world;
        private Location cachedBukkit;

        SerializableLocationBuilder() {
        }

        /**
         * @return {@code this}.
         */
        public SerializableLocation.SerializableLocationBuilder x(final double x) {
            this.x = x;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableLocation.SerializableLocationBuilder y(final double y) {
            this.y = y;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableLocation.SerializableLocationBuilder z(final double z) {
            this.z = z;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableLocation.SerializableLocationBuilder pitch(final float pitch) {
            this.pitch = pitch;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableLocation.SerializableLocationBuilder yaw(final float yaw) {
            this.yaw = yaw;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableLocation.SerializableLocationBuilder world(final String world) {
            this.world = world;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableLocation.SerializableLocationBuilder cachedBukkit(final Location cachedBukkit) {
            this.cachedBukkit = cachedBukkit;
            return this;
        }

        public SerializableLocation build() {
            return new SerializableLocation(this.x, this.y, this.z, this.pitch, this.yaw, this.world, this.cachedBukkit);
        }

        @Override
        public String toString() {
            return "SerializableLocation.SerializableLocationBuilder(x=" + this.x + ", y=" + this.y + ", z=" + this.z + ", pitch=" + this.pitch + ", yaw=" + this.yaw + ", world=" + this.world + ", cachedBukkit=" + this.cachedBukkit + ")";
        }
    }

    public static SerializableLocation.SerializableLocationBuilder builder() {
        return new SerializableLocation.SerializableLocationBuilder();
    }

    public SerializableLocation.SerializableLocationBuilder toBuilder() {
        return new SerializableLocation.SerializableLocationBuilder().x(this.x).y(this.y).z(this.z).pitch(this.pitch).yaw(this.yaw).world(this.world).cachedBukkit(this.cachedBukkit);
    }

    public SerializableLocation(final double x, final double y, final double z, final float pitch, final float yaw, final String world, final Location cachedBukkit) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.pitch = pitch;
        this.yaw = yaw;
        this.world = world;
        this.cachedBukkit = cachedBukkit;
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

    public float getPitch() {
        return this.pitch;
    }

    public float getYaw() {
        return this.yaw;
    }

    public String getWorld() {
        return this.world;
    }
}
