package com.craftmend.openaudiomc.spigot.modules.speakers.listeners;

import com.craftmend.openaudiomc.OpenAudioMcCore;
import com.craftmend.openaudiomc.generic.interfaces.ConfigurationInterface;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.configuration.enums.StorageKey;
import com.craftmend.openaudiomc.generic.configuration.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerModule;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import lombok.AllArgsConstructor;
import org.bukkit.block.Block;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockPlaceEvent;

import java.util.UUID;

@AllArgsConstructor
public class SpeakerCreateListener implements Listener {

    private OpenAudioMcSpigot openAudioMcSpigot;
    private SpeakerModule speakerModule;

    @EventHandler
    public void onBlockPlace(BlockPlaceEvent event) {
        Block placed = event.getBlockPlaced();

        if (speakerModule.isSpeakerSkull(placed)) {
            if (!isAllowed(event.getPlayer())) {
                event.getPlayer().sendMessage(openAudioMcSpigot.getCommandModule().getCommandPrefix() + "You are not allowed to place OpenAudioMc speakers, please ask the server administrator for more information.");
                event.setCancelled(true);
                return;
            }

            SpigotConnection spigotConnection = openAudioMcSpigot.getPlayerModule().getClient(event.getPlayer());
            if (spigotConnection.getSelectedSpeakerSource() == null) {
                event.getPlayer().sendMessage(openAudioMcSpigot.getCommandModule().getCommandPrefix() + "You cant place OpenAudioMc speakers without using the command first. I dont know what sound you would like to add.");
                event.setCancelled(true);
                return;
            }

            UUID id = UUID.randomUUID();
            MappedLocation location = new MappedLocation(placed.getLocation());

            ConfigurationInterface congig = OpenAudioMcCore.getInstance().getConfigurationInterface();

            int range = congig.getInt(StorageKey.SETTINGS_SPEAKER_RANGE);

            speakerModule.registerSpeaker(location, spigotConnection.getSelectedSpeakerSource(), id, range);

            //save to config
            congig.setString(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".world", location.getWorld());
            congig.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".x", location.getX());
            congig.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".y", location.getY());
            congig.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".z", location.getZ());
            congig.setInt(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".radius", range);
            congig.setString(StorageLocation.DATA_FILE, "speakers." + id.toString() + ".media", spigotConnection.getSelectedSpeakerSource());

            event.getPlayer().sendMessage(openAudioMcSpigot.getCommandModule().getCommandPrefix() + "Speaker registered");
        }
    }

    private Boolean isAllowed(Player player) {
        return player.isOp()
                || player.hasPermission("openaudiomc.speakers.*")
                || player.hasPermission("openaudiomc.*")
                || player.hasPermission("openaudiomc.speakers.create");
    }

}
