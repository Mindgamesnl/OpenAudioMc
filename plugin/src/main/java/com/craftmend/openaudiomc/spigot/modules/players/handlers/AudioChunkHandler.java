package com.craftmend.openaudiomc.spigot.modules.players.handlers;

import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientPreFetch;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.utils.HeatMap;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.players.interfaces.ITickableHandler;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import org.bukkit.entity.Player;

import java.util.List;

public class AudioChunkHandler implements ITickableHandler {

    private final Player player;
    private final SpigotConnection spigotConnection;
    private boolean hasPrefetchedContent = false;

    private String currentAudioChunkId = "";

    public AudioChunkHandler(Player player, SpigotConnection spigotConnection) {
        this.player = player;
        this.spigotConnection = spigotConnection;
    }


    public void reset() {
        this.currentAudioChunkId = "";
    }

    @Override
    public void tick() {
        String newChunkId = OpenAudioMcSpigot.getInstance().getPredictiveMediaService().locationToAudioChunkId(player.getLocation());

        if (!newChunkId.equals(currentAudioChunkId)) {
            currentAudioChunkId = newChunkId;

            // clear old prefetches
            if (hasPrefetchedContent) {
                spigotConnection.getClientConnection().sendPacket(new PacketClientPreFetch(true));
            }

            HeatMap<String, HeatMap<String, Byte>>.Value audioChunk = OpenAudioMcSpigot.getInstance().getPredictiveMediaService().getChunkTracker().get(currentAudioChunkId);
            HeatMap<String, Byte> chunkContext = audioChunk.getContext();
            audioChunk.bump();


            // get top sounds for this chunk
            // prefetch the top X sounds, and fetch that from the config
            List<HeatMap<String, Byte>.Value> vls = chunkContext.getTop(StorageKey.SETTINGS_PRELOAD_SOUNDS.getInt());

            hasPrefetchedContent = !vls.isEmpty();
            for (HeatMap<String, Byte>.Value value : vls) {
                // prefetch
                spigotConnection.getClientConnection().sendPacket(new PacketClientPreFetch(value.getValue()));
            }
        }
    }
}
