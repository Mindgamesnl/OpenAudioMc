package com.craftmend.openaudiomc.spigot.modules.speakers.menu;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.interfaces.OAConfiguration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.menu.Menu;
import org.bukkit.ChatColor;
import org.bukkit.Material;

public class SpeakerMenu extends Menu {

    public SpeakerMenu(Speaker speaker) {
        super(OpenAudioMcSpigot.getInstance(), ChatColor.BLUE + "Updating speaker", 9);

        setItem(0, new Item(OpenAudioMcSpigot.getInstance().getSpeakerModule().getSkull())
                .setName(ChatColor.YELLOW + "Playing: " + ChatColor.AQUA + speaker.getMedia().getSource()));

        setItem(1, getDistanceItem(speaker, 2));
        setItem(2, getDistanceItem(speaker, 4));
        setItem(3, getDistanceItem(speaker, 5));
        setItem(4, getDistanceItem(speaker, 8));
        setItem(5, getDistanceItem(speaker, 10));
        setItem(6, getDistanceItem(speaker, 12));
        setItem(7, getDistanceItem(speaker, 14));
        setItem(8, getDistanceItem(speaker, 16));
    }

    private Item getDistanceItem(Speaker speaker, int distance) {
        return new Item(Material.NOTE_BLOCK)
                .setAmount(distance)
                .setEnchanted((speaker.getRadius() == distance))
                .setName(
                        (speaker.getRadius() == distance ? (
                                ChatColor.GREEN + "Current radius: " + distance
                        ) : (
                                ChatColor.AQUA + "Set radius to " + distance
                        ))
                )
                .onClick((player, item) -> {
                    if (distance == speaker.getRadius()) return;
                    OAConfiguration config = OpenAudioMc.getInstance().getOAConfiguration();
                    config.setInt(StorageLocation.DATA_FILE, "speakers." + speaker.getId().toString() + ".radius", distance);
                    speaker.setRadius(distance);
                    player.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + "Updated speaker radius to " + distance);
                    new SpeakerMenu(speaker).openFor(player);
                });
    }

}
