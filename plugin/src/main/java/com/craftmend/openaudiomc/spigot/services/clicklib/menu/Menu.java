package com.craftmend.openaudiomc.spigot.services.clicklib.menu;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.managers.InventoryManager;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.inventory.Inventory;
import org.bukkit.inventory.InventoryHolder;
import org.bukkit.plugin.java.JavaPlugin;

import java.util.HashMap;
import java.util.Map;

public abstract class Menu implements InventoryHolder {

    @Getter
    private Inventory inventory;
    private Map<Integer, Item> slotMap = new HashMap<>();

    public Menu(String name, int size) {
        inventory = Bukkit.createInventory(this, size, name);
        InventoryManager.getInstance(OpenAudioMcSpigot.getInstance());
    }

    public void onClose(Player player) {

    }

    public Menu setItem(int slot, Item item) {
        slotMap.put(slot, item);
        inventory.setItem(slot, item.getItem());
        return this;
    }

    void handleClick(int slot, Player player) {
        Item itemAtSlot = slotMap.get(slot);
        if (itemAtSlot == null) return;
        itemAtSlot.getOnClick().accept(player, itemAtSlot);
    }

    public void openFor(Player player) {
        player.openInventory(this.inventory);
    }

}
