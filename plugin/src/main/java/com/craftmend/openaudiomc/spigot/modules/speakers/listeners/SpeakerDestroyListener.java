package com.craftmend.openaudiomc.spigot.modules.speakers.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.configuration.enums.StorageLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerModule;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;
import lombok.AllArgsConstructor;
import org.bukkit.block.Block;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.BlockBreakEvent;

@AllArgsConstructor
public class SpeakerDestroyListener implements Listener {

    private OpenAudioMc openAudioMc;
    private SpeakerModule speakerModule;

    @EventHandler
    public void onBlockBreak(BlockBreakEvent event) {
        Block broken = event.getBlock();
        if (speakerModule.isSpeakerSkull(broken)) {
            if (!isAllowed(event.getPlayer())) {
                event.getPlayer().sendMessage(openAudioMc.getCommandModule().getCommandPrefix() + "You are not allowed to break OpenAudioMc speakers, please ask the server administrator for more information.");
                event.setCancelled(true);
                return;
            }

            MappedLocation location = new MappedLocation(broken.getLocation());
            Speaker speaker = speakerModule.getSpeaker(location);
            if (speaker == null) return;

            speakerModule.unlistSpeaker(location);

            //save to config
            openAudioMc.getConfigurationModule().setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString() + ".world", null);
            openAudioMc.getConfigurationModule().setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString() + ".x", null);
            openAudioMc.getConfigurationModule().setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString() + ".y", null);
            openAudioMc.getConfigurationModule().setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString() + ".z", null);
            openAudioMc.getConfigurationModule().setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString() + ".media", null);
            openAudioMc.getConfigurationModule().setString(StorageLocation.CONFIG_FILE,"speakers." + speaker.getId().toString(), null);

            event.getPlayer().sendMessage(openAudioMc.getCommandModule().getCommandPrefix() + "Speaker removed");
        }
    }

    private Boolean isAllowed(Player player) {
        return player.isOp()
                || player.hasPermission("openaudiomc.speakers.*")
                || player.hasPermission("openaudiomc.*")
                || player.hasPermission("openaudiomc.speakers.destroy");
    }

}
