package com.craftmend.openaudiomc.spigot.modules.regions.gui;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.regions.interfaces.IRegion;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.menu.Menu;
import org.bukkit.ChatColor;
import org.bukkit.Material;

public class RegionEditGui extends Menu {

    public RegionEditGui(IRegion region) {
        super(ChatColor.BLUE + "Updating Region", 2 * 9);

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

        setItem(10, getFadeItem(region, 0));
        setItem(11, getFadeItem(region, 500));
        setItem(12, getFadeItem(region, 1000));
        setItem(13, getFadeItem(region, 1500));
        setItem(14, getFadeItem(region, 2000));
        setItem(15, getFadeItem(region, 5000));
        setItem(16, getFadeItem(region, 7000));
        setItem(17, getFadeItem(region, 10000));
    }

    private Item getFadeItem(IRegion region, int fadeTime) {
        return new Item(((region.getProperties().getFadeTimeMs() == fadeTime) ? Material.REDSTONE_BLOCK : Material.NOTE_BLOCK))
                .setEnchanted((region.getProperties().getFadeTimeMs() == fadeTime))
                .setName(
                        (region.getProperties().getFadeTimeMs() == fadeTime ? (
                                ChatColor.GREEN + "Current fade time: " + ChatColor.WHITE + fadeTime + "MS"
                        ) : (
                                ChatColor.AQUA + "Set fade time " + fadeTime + "MS"
                        ))
                )
                .onClick((player, item) -> {
                    if (fadeTime == region.getProperties().getFadeTimeMs()) return;
                    ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();
                    config.setInt(StorageLocation.DATA_FILE, "regionsfadetime." + region.getId().toString(), fadeTime);
                    region.getProperties().setFadeTimeMs(fadeTime);

                    player.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + ChatColor.GREEN + "Updated region fadetime to " + fadeTime);

                    SpigotConnection spigotClient = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(player.getUniqueId());
                    spigotClient.getRegionHandler().reset();

                    spigotClient.getRegionHandler().tick();

                    new RegionEditGui(region).openFor(player);
                });
    }

    private Item getVolumeItem(IRegion region, int volume) {
        return new Item(((region.getVolume() == volume) ? Material.REDSTONE_BLOCK : Material.NOTE_BLOCK))
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
                    ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();
                    config.setInt(StorageLocation.DATA_FILE, "regionsvolume." + region.getId().toString(), volume);
                    region.setVolume(volume);

                    player.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + ChatColor.GREEN + "Updated region volume to " + volume);

                    SpigotConnection spigotClient = OpenAudioMcSpigot.getInstance().getPlayerModule().getClient(player.getUniqueId());
                    spigotClient.getRegionHandler().reset();

                    spigotClient.getRegionHandler().tick();

                    new RegionEditGui(region).openFor(player);
                });
    }

}
