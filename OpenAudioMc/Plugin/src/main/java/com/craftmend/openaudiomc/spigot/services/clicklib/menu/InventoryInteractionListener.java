package com.craftmend.openaudiomc.spigot.services.clicklib.menu;

import org.bukkit.Bukkit;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.inventory.InventoryClickEvent;
import org.bukkit.event.inventory.InventoryCloseEvent;

public class InventoryInteractionListener implements Listener {

    @EventHandler
    public void onInventoryClickEvent(InventoryClickEvent event) {
        if (event.getClickedInventory() != null) {
            if (event.getClickedInventory().getHolder() != null && event.getClickedInventory().getHolder() instanceof Menu) {
                event.setCancelled(true);
                Menu menu = (Menu) event.getClickedInventory().getHolder();
                menu.handleClick(event.getSlot(), Bukkit.getPlayer(event.getWhoClicked().getName()));
            }
        }
    }

    @EventHandler
    public void onClose(InventoryCloseEvent event) {
        if (event.getInventory().getHolder() != null && event.getInventory().getHolder() instanceof Menu) {
            Menu menu = (Menu) event.getInventory().getHolder();
            menu.onClose(Bukkit.getPlayer(event.getPlayer().getName()));
        }
    }

}
