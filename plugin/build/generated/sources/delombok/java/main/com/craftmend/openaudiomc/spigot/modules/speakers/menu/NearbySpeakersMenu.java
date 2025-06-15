package com.craftmend.openaudiomc.spigot.modules.speakers.menu;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.ApplicableSpeaker;
import com.craftmend.openaudiomc.spigot.services.clicklib.Item;
import com.craftmend.openaudiomc.spigot.services.clicklib.menu.Menu;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;

import java.util.Collection;

public class NearbySpeakersMenu extends Menu {

    public NearbySpeakersMenu(Player player) {
        super(ChatColor.BLUE + "Nearby speakers", 3 * 9);

        // get speakers
        Collection<ApplicableSpeaker> speakers = OpenAudioMc.getService(SpeakerService.class).getCollector().getApplicableSpeakers(player.getLocation(), true);
        if (speakers.isEmpty()) {
            player.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class)  + ChatColor.RED + "There aren't any speaker within your radius to show.");
            return;
        }

        int slot = 0;
        int maxSlots = 3 * 9;
        for (ApplicableSpeaker speaker : speakers) {
            if (slot == maxSlots - 1) break;

            // place item
            setItem(slot, new Item(OpenAudioMc.getService(SpeakerService.class).getPlayerSkullItem())
                    .setName(ChatColor.AQUA + "Nearby speaker #" + slot)
                    .setLore(new String[]{"Click here to open options", "for this speaker."})
                    .onClick((clicker, item) -> {
                        new SelectedSpeakerMenu(player, speaker).openFor(player);
                    })
            );
            slot++;
        }

        openFor(player);
    }
}
