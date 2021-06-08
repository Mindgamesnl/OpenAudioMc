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
        super(ChatColor.BLUE + "Updating Region", 3 * 9);

        // 2, 4, 6 context / setting slots
        setItem(2, new Item(Material.ITEM_FRAME)
                .setName(ChatColor.YELLOW + "Playing: " + ChatColor.AQUA + region.getMedia().getSource()));

        setItem(4, getVoicechatToggleItem(region));
        
        // something fun for slot 6? think of something mats

        // second row, volume fuckery
        setItem(9, getVolumeItem(region, 5));
        setItem(10, getVolumeItem(region, 10));
        setItem(11, getVolumeItem(region, 15));
        setItem(12, getVolumeItem(region, 20));
        setItem(13, getVolumeItem(region, 30));
        setItem(14, getVolumeItem(region, 50));
        setItem(15, getVolumeItem(region, 70));
        setItem(16, getVolumeItem(region, 80));
        setItem(17, getVolumeItem(region, 100));

        // third row, fade shit
        setItem(18, getFadeItem(region, 0));
        setItem(19, getFadeItem(region, 500));
        setItem(20, getFadeItem(region, 1000));
        setItem(21, getFadeItem(region, 1500));
        setItem(22, getFadeItem(region, 2000));
        setItem(23, getFadeItem(region, 5000));
        setItem(24, getFadeItem(region, 7000));
        setItem(25, getFadeItem(region, 10000));
        setItem(26, getFadeItem(region, 15000));
    }

    private Item getVoicechatToggleItem(IRegion region) {
        Material head = OpenAudioMcSpigot.getInstance().getSpeakerModule().getPlayerSkullItem();

        Item item = new Item(head)
                .setName(ChatColor.YELLOW + "Allow voice chat: " + (
                        region.getProperties().isAllowsVoiceChat() ? ChatColor.GREEN + "True" : ChatColor.RED + "False"
                ))
                .onClick((player, clickedItem) -> {
                    // flip setting

                    region.getProperties().setAllowsVoiceChat(!region.getProperties().isAllowsVoiceChat());
                    // save the new setting

                    ConfigurationImplementation config = OpenAudioMc.getInstance().getConfiguration();
                    config.setString(StorageLocation.DATA_FILE, "regionmeta." + region.getId().toString() + ".allow-vc", region.getProperties().isAllowsVoiceChat() + "");

                    if (region.getProperties().isAllowsVoiceChat()) {
                        player.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + ChatColor.GREEN + "Voicechat has been enabled for this region.");
                    } else {
                        player.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + ChatColor.RED + "Voicechat has been disabled for this region, meaning that players will mute/leave their call once they enter.");
                    }

                    new RegionEditGui(region).openFor(player);
                });

        return item;
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
