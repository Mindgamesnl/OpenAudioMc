package com.craftmend.openaudiomc.spigot.modules.predictive;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
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
    @Getter private final HeatMap<Long, HeatMap<String, Byte>> activeRegions = new HeatMap<>(
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
                if (packet instanceof SourceHolder) {
                    String source = ((SourceHolder) packet).getSource();

                    Player player = Bukkit.getPlayer(target.getOwnerUUID());
                    if (player == null) return;

                    // bump the source for the players chunk chunk
                    activeRegions.get(locationToAudioChunkId(player.getLocation())).getContext().bump(source);
                }
            }
        };
    }

    public long locationToAudioChunkId(Location location) {
        int chunkX = (int) Math.floor(location.getBlockX()) << 10;
        int chunkZ = (int) Math.floor(location.getBlockZ()) << 10;
        return (long) chunkX & 0xffffffffL | ((long) chunkZ & 0xffffffffL) << 32;
    }
}
