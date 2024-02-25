package com.craftmend.openaudiomc.spigot.modules.speakers.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.api.speakers.ExtraSpeakerOptions;
import com.craftmend.openaudiomc.api.speakers.SpeakerType;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import de.tr7zw.changeme.nbtapi.NBTItem;
import lombok.AllArgsConstructor;
import org.bukkit.ChatColor;
import org.bukkit.block.Block;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockPlaceEvent;

import java.util.EnumSet;
import java.util.UUID;

@AllArgsConstructor
public class SpeakerCreateListener implements Listener {

    private OpenAudioMcSpigot openAudioMcSpigot;
    private SpeakerService speakerService;

    @EventHandler
    public void onBlockPlace(BlockPlaceEvent event) {
        Block placed = event.getBlockPlaced();
        if (SpeakerUtils.isSpeakerSkull(placed)) {
            if (!isAllowed(event.getPlayer())) {
                event.getPlayer().sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "You are not allowed to place OpenAudioMc speakers, please ask the server administrator for more information.");
                event.setCancelled(true);
                return;
            }

            NBTItem nbti = new NBTItem(event.getItemInHand());
            String src = nbti.getString("oa-src");
            Integer radius = nbti.getInteger("oa-radius");

            if (src == null) {
                event.getPlayer().sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "This speaker seems to be invalid. Please spawn a new one.");
                return;
            }

            UUID id = UUID.randomUUID();
            MappedLocation location = new MappedLocation(placed.getLocation());

            SpeakerType speakerType = speakerService.getCollector().guessSpeakerType(location.toBukkit(), src);
            Speaker speaker = new Speaker(src, id, radius, location, speakerType, EnumSet.noneOf(ExtraSpeakerOptions.class));
            speakerService.registerSpeaker(speaker);

            // save
            OpenAudioMc.getService(DatabaseService.class)
                    .getRepository(Speaker.class)
                    .save(speaker);

            event.getPlayer().sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + ChatColor.GREEN + "Placed a " + speakerType.getName() + " speaker" + ChatColor.GRAY + " (guessed bases on other nearby speakers, click placed speaker to edit)");
        }
    }

    private boolean isAllowed(Player player) {
        return player.isOp()
                || player.hasPermission("openaudiomc.speakers.*")
                || player.hasPermission("openaudiomc.*")
                || player.hasPermission("openaudiomc.speakers.create");
    }

}
