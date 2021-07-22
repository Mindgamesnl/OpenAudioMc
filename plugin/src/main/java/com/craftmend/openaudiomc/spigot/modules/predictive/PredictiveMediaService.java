package com.craftmend.openaudiomc.spigot.modules.predictive;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.interfaces.INetworkingEvents;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.payloads.client.interfaces.SourceHolder;
import com.craftmend.openaudiomc.generic.player.SpigotPlayerAdapter;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.utils.data.HeatMap;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.predictive.serialization.ChunkMapSerializer;
import com.craftmend.openaudiomc.spigot.modules.predictive.serialization.SerializedAudioChunk;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bukkit.Location;
import org.bukkit.entity.Player;

import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@NoArgsConstructor
public class PredictiveMediaService extends Service {

    private final ChunkMapSerializer chunkMapSerializer = new ChunkMapSerializer();
    private int chunkAge = 60 * 60 * 10;  // chunk values are kept for 10 hours
    private int maxChunkData = 70;       // keep up to 70 chunks
    private int maxChunkCache = 15;      // keep 15 sounds per chunk

    // map "active" audio chunks of the world
    @Getter private HeatMap<String, HeatMap<String, Byte>> chunkTracker = new HeatMap<>(
            chunkAge,
            maxChunkData,
            () -> new HeatMap<String, Byte>(chunkAge, maxChunkCache, HeatMap.BYTE_CONTEXT)
    );

    @Override
    public void onEnable() {
        OpenAudioMc.getService(NetworkingService.class).addEventHandler(getPacketHook());
        try {
            loadFromFile();
        } catch (IOException e) {
            OpenAudioLogger.toConsole("Failed to load chunk-cache from file.");
        }
    }

    public void loadFromFile() throws IOException {
        SerializedAudioChunk.ChunkMap filemap = OpenAudioMc.getGson().fromJson(
                new String(Files.readAllBytes(new File(
                        OpenAudioMcSpigot.getInstance().getDataFolder(), "cache.json"
                ).toPath())),
                SerializedAudioChunk.ChunkMap.class
        );
        chunkTracker = chunkMapSerializer.applyFromChunkMap(filemap, chunkTracker);
    }

    public void onDisable() {
        // save
        Charset charset = Charset.forName(StandardCharsets.UTF_8.name());
        try (BufferedWriter writer = Files.newBufferedWriter(new File(
                OpenAudioMcSpigot.getInstance().getDataFolder(), "cache.json"
        ).toPath(), charset)) {
            String input = chunkMapSerializer.toJson(chunkTracker);
            writer.write(input);
            writer.flush();
        } catch (IOException x) {
            System.err.format("IOException: %s%n", x);
        }
    }

    private INetworkingEvents getPacketHook() {
        return new INetworkingEvents() {
            @Override
            public void onPacketSend(Authenticatable target, AbstractPacket packet) {
                if (packet.getData() instanceof SourceHolder) {
                    String source = ((SourceHolder) packet.getData()).getSource();
                    ClientConnection client = (ClientConnection) target;
                    Player player = ((SpigotPlayerAdapter) client.getPlayer()).getPlayer();

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
