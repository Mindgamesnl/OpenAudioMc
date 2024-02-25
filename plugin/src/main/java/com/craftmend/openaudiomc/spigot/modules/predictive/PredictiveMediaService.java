package com.craftmend.openaudiomc.spigot.modules.predictive;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.database.internal.Repository;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.payloads.client.interfaces.SourceHolder;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.utils.data.ConcurrentHeatMap;

import com.craftmend.openaudiomc.spigot.modules.predictive.serialization.ChunkMapSerializer;
import com.craftmend.openaudiomc.spigot.modules.predictive.serialization.SerializedAudioChunk;
import com.craftmend.openaudiomc.spigot.modules.predictive.sorage.StoredWorldChunk;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bukkit.Location;
import org.bukkit.entity.Player;

import java.io.IOException;
import java.util.Map;

@NoArgsConstructor
public class PredictiveMediaService extends Service {

    @Inject
    private DatabaseService databaseService;

    private final ChunkMapSerializer chunkMapSerializer = new ChunkMapSerializer();
    private final int chunkAge = 60 * 60 * 10;  // chunk values are kept for 10 hours
    private final int maxChunkData = 70;       // keep up to 70 chunks
    private final int maxChunkCache = 15;      // keep 15 sounds per chunk

    // map "active" audio chunks of the world
    @Getter
    private ConcurrentHeatMap<String, ConcurrentHeatMap<String, Byte>> chunkTracker = new ConcurrentHeatMap<>(
            chunkAge,
            maxChunkData,
            () -> new ConcurrentHeatMap<String, Byte>(chunkAge, maxChunkCache, ConcurrentHeatMap.BYTE_CONTEXT)
    );

    @Override
    public void onEnable() {
        OpenAudioMc.getService(NetworkingService.class).addEventHandler(getPacketHook());

        chunkTracker.setDeleteConsumer((deletable) -> {
            Repository<StoredWorldChunk> repo = databaseService.getRepository(StoredWorldChunk.class);
            StoredWorldChunk c = repo.getWhere("chunk_name", deletable);
            if (c != null) {
                OpenAudioLogger.info("Deleted stale media chunk " + c.getChunkName() + " from database.");
                repo.delete(c);
            } else {
                OpenAudioLogger.warn("Failed to delete media chunk " + deletable + " from database, not found.");
            }
        });

        try {
            loadFromFile();
            OpenAudioLogger.info("Loaded " + chunkTracker.size() + " media chunks from file.");
        } catch (IOException e) {
            OpenAudioLogger.warn("Failed to load chunk-cache from file.");
        }
    }

    public void loadFromFile() throws IOException {
        // load SerializedAudioChunk.ChunkMap.class
        Repository<StoredWorldChunk> scm = databaseService.getRepository(StoredWorldChunk.class);
        SerializedAudioChunk.ChunkMap cm = new SerializedAudioChunk.ChunkMap();

        int deleted = 0;
        for (StoredWorldChunk value : scm.values()) {
            // it might be worthless
            // delete optional chunk if applicable
            if (value.getAudioChunk().getResources().isEmpty()) {
                scm.delete(value);
                deleted++;
                continue;
            }
            cm.getData().put(value.getChunkName(), value.getAudioChunk());
        }

        if (deleted > 0) {
            OpenAudioLogger.info("Purged " + deleted + " stale media chunks from database.");
        }

        chunkTracker = chunkMapSerializer.applyFromChunkMap(cm, chunkTracker);
    }

    public void onDisable() {
        // save
        OpenAudioLogger.info("Saving world cache...");
        Repository<StoredWorldChunk> repo = databaseService.getRepository(StoredWorldChunk.class);
        int written = 0;
        for (Map.Entry<String, SerializedAudioChunk.Chunk> entry : chunkMapSerializer.serialize(chunkTracker).getData().entrySet()) {
            String name = entry.getKey();
            SerializedAudioChunk.Chunk chunk = entry.getValue();
            StoredWorldChunk swc = new StoredWorldChunk(name, chunk);
            repo.save(swc);
            written++;
        }
        OpenAudioLogger.info("Saved " + written + " media chunks to db.");
    }

    private INetworkingEvents getPacketHook() {
        return new INetworkingEvents() {
            @Override
            public void onPacketSend(Authenticatable target, AbstractPacket packet) {
                if (packet.getData() instanceof SourceHolder) {
                    String source = ((SourceHolder) packet.getData()).getSource();
                    ClientConnection client = (ClientConnection) target;
                    Player player = (Player) client.getUser().getOriginal();

                    // bump the source for the players chunk chunk
                    chunkTracker.get(locationToAudioChunkId(player.getLocation())).getContext().bump(source);
                }
            }
        };
    }

    public String locationToAudioChunkId(Location location) {
        int chunkX = step(location.getBlockX());
        int chunkZ = step(location.getBlockZ());
        return chunkX + "@" + chunkZ;
    }

    private Integer step(Integer i) {
        if (i == 0) {
            return 0;
        }
        return i / 150;
    }
}
