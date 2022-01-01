package com.craftmend.openaudiomc.spigot.modules.regions.gui;

import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.AbstractRegionAdapter;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.menu.Menu;
import org.bukkit.ChatColor;
import org.bukkit.Material;
import org.bukkit.entity.Player;

import java.util.List;

public class RegionSelectionGui extends Menu {

    public RegionSelectionGui(Player opener) {
        super("Regions at your location", 9);

        AbstractRegionAdapter regionAdapter = OpenAudioMcSpigot.getInstance().getRegionModule().getRegionAdapter();
        List<IRegion> applicableRegions = regionAdapter.getAudioRegions(opener.getLocation());

        // don't do shit
        if (applicableRegions.isEmpty()) {
            opener.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.RED + "There are no OpenAudioMc regions registered on your current location, so there's nothing to display in the GUI.");
            return;
        }

        int i = 0;
        for (IRegion applicableRegion : applicableRegions) {
            Item item = new Item(Material.IRON_DOOR)
                    .setName(ChatColor.GREEN + applicableRegion.getId())
                    .setLore(new String[] {
                            ChatColor.GRAY + "Click to edit this region"
                    })
                    .setAmount(i + 1)
                    .onClick((clicker, a) -> {
                        new RegionEditGui(applicableRegion).openFor(clicker);
                    });

            setItem(i, item);
            i++;
        }

        openFor(opener);
    }

}
