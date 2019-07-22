package com.craftmend.openaudiomc.spigot.modules.players.handlers;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.interfaces.ITickableHandler;
import com.craftmend.openaudiomc.spigot.modules.players.objects.Client;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.IRegion;
import com.craftmend.openaudiomc.generic.networking.packets.PacketClientDestroyMedia;
import lombok.AllArgsConstructor;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
public class RegionHandler implements ITickableHandler {

    private Player player;
    private Client client;

    /**
     * update regions based on the players location
     */
    @Override
    public void tick() {
        if (OpenAudioMcSpigot.getInstance().getRegionModule() != null) {
            //regions are enabled
            List<IRegion> detectedRegions = OpenAudioMcSpigot.getInstance().getRegionModule()
                    .getRegionAdapter().getAudioRegions(player.getLocation());

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
                    OpenAudioMcSpigot.getInstance().getNetworkingService().send(client, new PacketClientDestroyMedia(exited.getMedia().getMediaId()));
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
