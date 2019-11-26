package com.craftmend.openaudiomc.spigot.services.clicklib;

import lombok.Getter;
import lombok.Setter;
import org.bukkit.Color;
import org.bukkit.Material;
import org.bukkit.enchantments.Enchantment;
import org.bukkit.entity.Player;
import org.bukkit.inventory.ItemFlag;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.ItemMeta;
import org.bukkit.inventory.meta.LeatherArmorMeta;

import java.util.Arrays;
import java.util.function.BiConsumer;

public class Item {

    @Getter
    private ItemStack item;
    @Getter
    private BiConsumer<Player, Item> onClick = (a, b) -> {};

    public Item(ItemStack itemStack) {
        if (itemStack == null) itemStack = new ItemStack(Material.AIR, 1);
        this.item = itemStack.clone();
        ItemMeta meta = item.getItemMeta();
        if (meta != null) {
            meta.addItemFlags(ItemFlag.HIDE_ATTRIBUTES);
            item.setItemMeta(meta);
        }
    }

    public Item(Material material) {
        item = new ItemStack(material, 1);
        ItemMeta meta = item.getItemMeta();
        meta.addItemFlags(ItemFlag.HIDE_ATTRIBUTES);
        item.setItemMeta(meta);
    }

    public Item(Material material, int damage) {
        item = new ItemStack(material, 1, (short) damage);
        ItemMeta meta = item.getItemMeta();
        meta.addItemFlags(ItemFlag.HIDE_ATTRIBUTES);
        meta.setUnbreakable(true);
        item.setItemMeta(meta);
    }

    public Item setAmount(int amount) {
        item.setAmount(amount);
        return this;
    }

    public Item onClick(BiConsumer<Player, Item> onClick) {
        this.onClick = onClick;
        return this;
    }

    public Item setUnbreakable() {
        ItemMeta meta = item.getItemMeta();
        meta.setUnbreakable(true);
        item.setItemMeta(meta);
        return this;
    }

    public Item setColor(int r, int g, int b) {
        LeatherArmorMeta lch = (LeatherArmorMeta) item.getItemMeta();
        lch.setColor(Color.fromRGB(r, g, b));
        item.setItemMeta(lch);
        return this;
    }

    public Item setLore(String[] arguments) {
        ItemMeta meta = item.getItemMeta();
        meta.setLore(Arrays.asList(arguments));
        item.setItemMeta(meta);
        return this;
    }

    public Item setName(String name) {
        ItemMeta meta = item.getItemMeta();
        meta.setDisplayName(name);
        item.setItemMeta(meta);
        return this;
    }

    public Item setEnchanted() {
        ItemMeta testEnchantMeta = item.getItemMeta();
        testEnchantMeta.addEnchant(Enchantment.ARROW_FIRE, 10, true);
        testEnchantMeta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
        item.setItemMeta(testEnchantMeta);
        return this;
    }

    public Item setEnchanted(Boolean state) {
        if (state) {
            setEnchanted();
        } else {
            ItemMeta testEnchantMeta = item.getItemMeta();
            testEnchantMeta.removeEnchant(Enchantment.ARROW_FIRE);
            item.setItemMeta(testEnchantMeta);
        }
        return this;
    }

}
