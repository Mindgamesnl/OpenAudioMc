package com.craftmend.openaudiomc.spigot.modules.predictive.serialization;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.utils.data.ConcurrentHeatMap;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ChunkMapSerializer {

    public String toJson(ConcurrentHeatMap<String, ConcurrentHeatMap<String, Byte>> data) {
        return OpenAudioMc.getGson().toJson(serialize(data));
    }

    public ConcurrentHeatMap<String, ConcurrentHeatMap<String, Byte>> applyFromChunkMap(SerializedAudioChunk.ChunkMap loaded, ConcurrentHeatMap<String, ConcurrentHeatMap<String, Byte>> currentMap) {
        return explodeInto(loaded, currentMap);
    }

    private SerializedAudioChunk.ChunkMap serialize(ConcurrentHeatMap<String, ConcurrentHeatMap<String, Byte>> data) {
        SerializedAudioChunk.ChunkMap chunkMap = new SerializedAudioChunk.ChunkMap();

        Map<String, ConcurrentHeatMap<String, ConcurrentHeatMap<String, Byte>>.Value> map = data.getMap();
        Map<String, SerializedAudioChunk.Chunk> serializedMap = new HashMap<>();

        for (Map.Entry<String, ConcurrentHeatMap<String, ConcurrentHeatMap<String, Byte>>.Value> entry : map.entrySet()) {
            String chunkId = entry.getKey();
            ConcurrentHeatMap<String, ConcurrentHeatMap<String, Byte>>.Value chunkContent = entry.getValue();

            SerializedAudioChunk.Chunk chunk = new SerializedAudioChunk.Chunk();
            List<SerializedAudioChunk.ChunkResource> resourceList = new ArrayList<>();

            for (ConcurrentHeatMap<String, Byte>.Value value : chunkContent.getContext().getValues()) {
                SerializedAudioChunk.ChunkResource resource = new SerializedAudioChunk.ChunkResource();
                resource.setScore(value.getScore());
                resource.setSource(value.getValue());
                resource.setLastPing(value.getPingedAt());

                resourceList.add(resource);
            }

            chunk.setResources(resourceList);
            serializedMap.put(chunkId, new SerializedAudioChunk.Chunk(resourceList));
            map.put(chunkId, chunkContent);
        }

        chunkMap.setData(serializedMap);

        return chunkMap;
    }

    private ConcurrentHeatMap<String, ConcurrentHeatMap<String, Byte>> explodeInto(SerializedAudioChunk.ChunkMap chunkMap, ConcurrentHeatMap<String, ConcurrentHeatMap<String, Byte>> curentMap) {
        for (Map.Entry<String, SerializedAudioChunk.Chunk> entry : chunkMap.getData().entrySet()) {
            String chunkId = entry.getKey();
            SerializedAudioChunk.Chunk chunk = entry.getValue();

            ConcurrentHeatMap<String, Byte> byteConcurrentHeatMap = curentMap.get(chunkId).getContext();

            for (SerializedAudioChunk.ChunkResource resource : chunk.getResources()) {
                byteConcurrentHeatMap.forceValue(
                        resource.getSource(),
                        Instant.now(),
                        resource.getScore()
                );
            }

            byteConcurrentHeatMap.clean();
            curentMap.get(chunkId).setContext(byteConcurrentHeatMap);
        }
        return curentMap;
    }

}
