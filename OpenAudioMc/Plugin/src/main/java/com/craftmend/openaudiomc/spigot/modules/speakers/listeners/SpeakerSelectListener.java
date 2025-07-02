package com.craftmend.openaudiomc.spigot.modules.speakers.listeners;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.speakers.SpeakerService;
import com.craftmend.openaudiomc.spigot.modules.speakers.menu.SpeakerMenu;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.MappedLocation;
import com.craftmend.openaudiomc.spigot.modules.speakers.objects.Speaker;

import com.craftmend.openaudiomc.spigot.modules.speakers.utils.SpeakerUtils;
import com.craftmend.openaudiomc.spigot.services.server.ServerService;
import com.craftmend.openaudiomc.spigot.services.server.enums.ServerVersion;
import lombok.AllArgsConstructor;

import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.block.Action;
import org.bukkit.event.player.PlayerInteractEvent;
import org.bukkit.inventory.EquipmentSlot;

@AllArgsConstructor
public class SpeakerSelectListener implements Listener {

    private SpeakerService speakerService;

    @EventHandler
    public void onClick(PlayerInteractEvent event) {
        if (OpenAudioMc.getService(ServerService.class).getVersion() == ServerVersion.MODERN && event.getHand() != EquipmentSlot.HAND) return;
        if (event.getAction() == Action.RIGHT_CLICK_BLOCK) {
            if (isAllowed(event.getPlayer())) {
                Speaker speaker = speakerService.getSpeaker(new MappedLocation(event.getClickedBlock().getLocation()));
                if (speaker == null) {
                    return;
                }
                if (!SpeakerUtils.isSpeakerSkull(speaker.getLocation().getBlock())) return;
                new SpeakerMenu(speaker).openFor(event.getPlayer());
            }
        }
    }

    private boolean isAllowed(Player player) {
        return player.isOp()
                || player.hasPermission("openaudiomc.speakers.*")
                || player.hasPermission("openaudiomc.*")
                || player.hasPermission("openaudiomc.speakers.manage");
    }

}
