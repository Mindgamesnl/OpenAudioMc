package com.craftmend.openaudiomc.modules.players.handlers;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.players.objects.Client;
import com.craftmend.openaudiomc.modules.regions.objects.IRegion;
import com.craftmend.openaudiomc.services.networking.packets.PacketClientDestroyMedia;
import lombok.AllArgsConstructor;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
public class RegionHandler {

    private Player player;
    private Client client;

    /**
     * update regions based on the players location
     */
    public void tickRegions() {
        if (OpenAudioMc.getInstance().getRegionModule() != null) {
            //regions are enabled
            List<IRegion> detectedRegions = OpenAudioMc.getInstance().getRegionModule().getRegions(player.getLocation());

            List<IRegion> enteredRegions = new ArrayList<>(detectedRegions);
            enteredRegions.removeIf(t -> containsRegion(client.getRegions(), t));

            List<IRegion> leftRegions = new ArrayList<>(client.getRegions());
            leftRegions.removeIf(t -> containsRegion(detectedRegions, t));

            List<IRegion> takeOverMedia = new ArrayList<>();
            enteredRegions.forEach(entered -> {
                if (!isPlayingRegion(entered)) {
                    client.sendMedia(entered.getMedia());
                } else {
                    takeOverMedia.add(entered);
                }
            });

            leftRegions.forEach(exited -> {
                if (!containsRegion(takeOverMedia, exited)) {
                    OpenAudioMc.getInstance().getNetworkingService().send(client, new PacketClientDestroyMedia(exited.getMedia().getMediaId()));
                }
            });

            client.setCurrentRegions(detectedRegions);
        }
    }

    private Boolean containsRegion(List<IRegion> list, IRegion query) {
        for (IRegion r : list) if (query.getMedia().getSource().equals(r.getMedia().getSource())) return true;
        return false;
    }

    private Boolean isPlayingRegion(IRegion region) {
        for (IRegion r : client.getRegions()) if (region.getMedia().getSource().equals(r.getMedia().getSource())) return true;
        return false;
    }

}
