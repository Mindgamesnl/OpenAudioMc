package com.craftmend.openaudiomc.spigot.modules.speakers.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.SpigotPlayerService;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.speakers.enums.SpeakerType;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;

import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import lombok.AllArgsConstructor;
import org.bukkit.ChatColor;
import org.bukkit.block.Block;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockPlaceEvent;

import java.util.HashSet;
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

            SpigotConnection spigotConnection = OpenAudioMc.getService(SpigotPlayerService.class).getClient(event.getPlayer());
            if (spigotConnection.getSelectedSpeakerSettings() == null) {
                event.getPlayer().sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "You cant place OpenAudioMc speakers without using the command first. I dont know what sound you would like to add.");
                event.setCancelled(true);
                return;
            }

            UUID id = UUID.randomUUID();
            MappedLocation location = new MappedLocation(placed.getLocation());
            int range = spigotConnection.getSelectedSpeakerSettings().getRadius();

            SpeakerType speakerType = speakerService.getCollector().guessSpeakerType(location.toBukkit(), spigotConnection.getSelectedSpeakerSettings().getSource());

            Speaker speaker = new Speaker(spigotConnection.getSelectedSpeakerSettings().getSource(), id, range, location, speakerType, new HashSet<>());
            speakerService.registerSpeaker(speaker);

            // save
            OpenAudioMc.getService(DatabaseService.class)
                    .getRepository(Speaker.class)
                    .save(speaker.getId().toString(), speaker);

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
