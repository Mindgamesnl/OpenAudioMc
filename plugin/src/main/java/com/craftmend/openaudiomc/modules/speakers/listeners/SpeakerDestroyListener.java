package com.craftmend.openaudiomc.modules.speakers.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.speakers.SpeakerModule;
import com.craftmend.openaudiomc.modules.speakers.objects.SimpleLocation;
import com.craftmend.openaudiomc.modules.speakers.objects.Speaker;
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

            SimpleLocation location = new SimpleLocation(broken.getLocation());
            Speaker speaker = speakerModule.getSpeaker(location);
            if (speaker == null) return;

            speakerModule.unlistSpeaker(location);

            //save to config
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + speaker.getId().toString() + ".world", null);
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + speaker.getId().toString() + ".x", null);
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + speaker.getId().toString() + ".y", null);
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + speaker.getId().toString() + ".z", null);
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + speaker.getId().toString() + ".media", null);
            openAudioMc.getConfigurationModule().getDataConfig().set("speakers." + speaker.getId().toString(), null);

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
