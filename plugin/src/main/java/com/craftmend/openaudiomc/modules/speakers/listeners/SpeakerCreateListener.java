package com.craftmend.openaudiomc.modules.speakers.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.craftmend.openaudiomc.modules.speakers.SpeakerModule;
import com.craftmend.openaudiomc.modules.speakers.objects.SimpleLocation;
import lombok.AllArgsConstructor;
import org.bukkit.block.Block;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockPlaceEvent;

import java.util.UUID;

@AllArgsConstructor
public class SpeakerCreateListener implements Listener {

    private OpenAudioMc openAudioMc;
    private SpeakerModule speakerModule;

    @EventHandler
    public void onBlockPlace(BlockPlaceEvent event) {
        Block placed = event.getBlockPlaced();

        if (speakerModule.isSpeakerSkull(placed)) {
            if (!isAllowed(event.getPlayer())) {
                event.getPlayer().sendMessage(openAudioMc.getCommandModule().getCommandPrefix() + "You are not allowed to place OpenAudioMc speakers, please ask the server administrator for more information.");
                event.setCancelled(true);
                return;
            }

            Client client = openAudioMc.getPlayerModule().getClient(event.getPlayer());
            if (client.getSelectedSpeakerSource() == null) {
                event.getPlayer().sendMessage(openAudioMc.getCommandModule().getCommandPrefix() + "You cant place OpenAudioMc speakers without using the command first. I dont know what sound you would like to add.");
                event.setCancelled(true);
                return;
            }

            UUID id = UUID.randomUUID();
            SimpleLocation location = new SimpleLocation(placed.getLocation());
            speakerModule.registerSpeaker(location, client.getSelectedSpeakerSource(), id, 10);

            //save to config
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".world", location.getWorld());
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".x", location.getX());
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".y", location.getY());
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".z", location.getZ());
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".radius", 10);
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + id.toString() + ".media", client.getSelectedSpeakerSource());

            event.getPlayer().sendMessage(openAudioMc.getCommandModule().getCommandPrefix() + "Speaker registered");
        }
    }

    private Boolean isAllowed(Player player) {
        return player.isOp()
                || player.hasPermission("openaudiomc.speakers.*")
                || player.hasPermission("openaudiomc.*")
                || player.hasPermission("openaudiomc.speakers.create");
    }

}
