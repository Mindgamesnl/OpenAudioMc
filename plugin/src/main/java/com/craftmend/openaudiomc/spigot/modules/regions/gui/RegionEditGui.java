package com.craftmend.openaudiomc.spigot.modules.regions.gui;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.menu.Menu;
import org.bukkit.ChatColor;
import org.bukkit.Material;

public class RegionEditGui extends Menu {

    public RegionEditGui(IRegion region) {
        super(ChatColor.BLUE + "Updating Region", 9);

        setItem(0, new Item(Material.ITEM_FRAME)
                .setName(ChatColor.YELLOW + "Playing: " + ChatColor.AQUA + region.getMedia().getSource()));

        setItem(1, getVolumeItem(region, 5));
        setItem(2, getVolumeItem(region, 10));
        setItem(3, getVolumeItem(region, 20));
        setItem(4, getVolumeItem(region, 30));
        setItem(5, getVolumeItem(region, 50));
        setItem(6, getVolumeItem(region, 70));
        setItem(7, getVolumeItem(region, 80));
        setItem(8, getVolumeItem(region, 100));
    }

    private Item getVolumeItem(IRegion region, int volume) {
        return new Item(Material.NOTE_BLOCK)
                .setAmount(volume)
                .setEnchanted((region.getVolume() == volume))
                .setName(
                        (region.getVolume() == volume ? (
                                ChatColor.GREEN + "Current volume: " + ChatColor.WHITE + volume + "%"
                        ) : (
                                ChatColor.AQUA + "Set volume to " + volume + "%"
                        ))
                )
                .onClick((player, item) -> {
                    if (volume == region.getVolume()) return;
                    ConfigurationImplementation config = OpenAudioMc.getInstance().getConfigurationImplementation();
                    config.setInt(StorageLocation.DATA_FILE, "regions." + region.getId().toString() + ".volume", volume);
                    region.setVolume(volume);
                    player.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + ChatColor.GREEN + "Updated region volume to " + volume);
                    SpigotConnection spigotClient = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(player.getUniqueId());
                    spigotClient.getRegionHandler().reset();

                    new RegionEditGui(region).openFor(player);
                });
    }

}
