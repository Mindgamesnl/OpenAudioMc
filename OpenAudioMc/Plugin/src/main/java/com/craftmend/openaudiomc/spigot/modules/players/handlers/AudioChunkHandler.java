package com.craftmend.openaudiomc.spigot.modules.players.handlers;

import com.craftmend.openaudiomc.api.interfaces.AudioApi;
import com.craftmend.openaudiomc.generic.networking.packets.client.media.PacketClientPreFetch;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.spigot.modules.players.interfaces.ITickableHandler;
import com.craftmend.openaudiomc.spigot.modules.players.objects.SpigotConnection;
import org.bukkit.entity.Player;

import java.util.Collection;

public class AudioChunkHandler implements ITickableHandler {

    private final Player player;
    private final SpigotConnection spigotConnection;
    private boolean hasPrefetchedContent = false;
    private final AudioApi audioApi = AudioApi.getInstance();

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
        String newChunkId = audioApi.getWorldApi().getChunkId(player.getLocation());

        if (!newChunkId.equals(currentAudioChunkId)) {
            currentAudioChunkId = newChunkId;

            if (hasPrefetchedContent) spigotConnection.getClientConnection().sendPacket(new PacketClientPreFetch(true));

            Collection<String> media = audioApi.getWorldApi().getPredictedSources(player.getLocation());
            hasPrefetchedContent = !media.isEmpty();

            for (String s : media) {
                spigotConnection.getClientConnection().sendPacket(new PacketClientPreFetch(s, StorageKey.SETTINGS_PRELOAD_REPLENISH_POOL.getBoolean()));
            }
        }
    }
}
