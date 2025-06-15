package com.craftmend.openaudiomc.generic.redis.packets.models;

import org.bukkit.Material;
import org.bukkit.inventory.ItemStack;

public class SerializableItem {
    private short durability;
    private Material material;

    public ItemStack toBukkit() {
        return new ItemStack(material, 1, durability);
    }

    public static SerializableItem fromBukkit(ItemStack itemStack) {
        return SerializableItem.builder().material(itemStack.getType()).durability(itemStack.getDurability()).build();
    }


    public static class SerializableItemBuilder {
        private short durability;
        private Material material;

        SerializableItemBuilder() {
        }

        /**
         * @return {@code this}.
         */
        public SerializableItem.SerializableItemBuilder durability(final short durability) {
            this.durability = durability;
            return this;
        }

        /**
         * @return {@code this}.
         */
        public SerializableItem.SerializableItemBuilder material(final Material material) {
            this.material = material;
            return this;
        }

        public SerializableItem build() {
            return new SerializableItem(this.durability, this.material);
        }

        @Override
        public String toString() {
            return "SerializableItem.SerializableItemBuilder(durability=" + this.durability + ", material=" + this.material + ")";
        }
    }

    public static SerializableItem.SerializableItemBuilder builder() {
        return new SerializableItem.SerializableItemBuilder();
    }

    public SerializableItem.SerializableItemBuilder toBuilder() {
        return new SerializableItem.SerializableItemBuilder().durability(this.durability).material(this.material);
    }

    public SerializableItem(final short durability, final Material material) {
        this.durability = durability;
        this.material = material;
    }
}
