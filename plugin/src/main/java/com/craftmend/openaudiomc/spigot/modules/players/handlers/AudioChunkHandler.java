package com.craftmend.openaudiomc.spigot.modules.players.handlers;

import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientPreFetch;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.utils.HeatMap;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.interfaces.ITickableHandler;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import org.bukkit.entity.Player;

public class AudioChunkHandler implements ITickableHandler {

    private final Player player;
    private final SpigotConnection spigotConnection;

    private long currentAudioChunkId = 0l;

    public AudioChunkHandler(Player player, SpigotConnection spigotConnection) {
        this.player = player;
        this.spigotConnection = spigotConnection;
    }


    @Override
    public void tick() {
        long newChunkId = OpenAudioMcSpigot.getInstance().getPredictiveMediaService().locationToAudioChunkId(player.getLocation());

        if (newChunkId != currentAudioChunkId) {
            currentAudioChunkId = newChunkId;

            // clear old prefetches
            spigotConnection.getClientConnection().sendPacket(new PacketClientPreFetch(true));

            HeatMap<String, Byte> chunkContext = OpenAudioMcSpigot.getInstance().getPredictiveMediaService().getActiveRegions().get(currentAudioChunkId).getContext();
            HeatMap.Value v = OpenAudioMcSpigot.getInstance().getPredictiveMediaService().getActiveRegions().get(currentAudioChunkId);
            v.bump();

            // get top sounds for this chunk
            // prefetch the top X sounds, and fetch that from the config
            for (HeatMap<String, Byte>.Value value : chunkContext.getTop(StorageKey.SETTINGS_PRELOAD_SOUNDS.getInt())) {
                // prefetch
                spigotConnection.getClientConnection().sendPacket(new PacketClientPreFetch(value.getValue()));
            }
        }
    }
}
