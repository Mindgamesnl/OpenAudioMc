package com.craftmend.openaudiomc.generic.redis.packets.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import org.bukkit.Material;
import org.bukkit.inventory.ItemStack;

@Builder(toBuilder = true)
@AllArgsConstructor
public class SerializableItem {

    private short durability;
    private Material material;

    public ItemStack toBukkit() {
        return new ItemStack(material, 1, durability);
    }

    public static SerializableItem fromBukkit(ItemStack itemStack) {
        return SerializableItem.builder()
                .material(itemStack.getType())
                .durability(itemStack.getDurability())
                .build();
    }

}
