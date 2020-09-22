package com.craftmend.openaudiomc.spigot.modules.predictive;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.payloads.client.interfaces.SourceHolder;
import com.craftmend.openaudiomc.generic.utils.HeatMap;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.entity.Player;

public class PredictiveMediaModule {

    private int chunkAge = 60 * 60;  // chunk values are kept for an hour
    private int maxChunkData = 50;   // keep up to 50 chunks
    private int maxChunkCache = 15;   // keep 5 sounds per chunk

    // map "active" audio chunks of the world
    @Getter private final HeatMap<String, HeatMap<String, Byte>> activeRegions = new HeatMap<>(
            chunkAge,
            maxChunkData,
            () -> new HeatMap<String, Byte>(chunkAge, maxChunkCache, HeatMap.BYTE_CONTEXT)
    );

    public PredictiveMediaModule() {
        OpenAudioMc.getInstance().getNetworkingService().addEventHandler(getPacketHook());
    }

    private INetworkingEvents getPacketHook() {
        return new INetworkingEvents() {
            @Override
            public void onPacketSend(Authenticatable target, AbstractPacket packet) {
                if (packet.getData() instanceof SourceHolder) {
                    String source = ((SourceHolder) packet.getData()).getSource();
                    ClientConnection client = (ClientConnection) target;
                    Player player = Bukkit.getPlayer(client.getPlayer().getUniqueId());

                    // bump the source for the players chunk chunk
                    activeRegions.get(locationToAudioChunkId(player.getLocation())).getContext().bump(source);
                }
            }
        };
    }

    private Integer step(Integer i) {
        if (i == 0) {
            return 0;
        }
        return i / 150;
    }

    public String locationToAudioChunkId(Location location) {
        int chunkX = step(location.getBlockX());
        int chunkZ = step(location.getBlockZ());
        return chunkX + "@" + chunkZ;
    }
}
