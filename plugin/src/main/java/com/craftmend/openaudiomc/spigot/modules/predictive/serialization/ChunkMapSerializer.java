package com.craftmend.openaudiomc.spigot.modules.predictive.serialization;

import com.craftmend.openaudiomc.generic.utils.HeatMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ChunkMapSerializer {

    public SerializedAudioChunk.ChunkMap serialize(HeatMap<String, HeatMap<String, Byte>> data) {
        SerializedAudioChunk.ChunkMap chunkMap = new SerializedAudioChunk.ChunkMap();

        Map<String, HeatMap<String, HeatMap<String, Byte>>.Value> map = data.getMap();

        for (Map.Entry<String, HeatMap<String, HeatMap<String, Byte>>.Value> entry : map.entrySet()) {
            String chunkId = entry.getKey();
            HeatMap<String, HeatMap<String, Byte>>.Value chunkContent = entry.getValue();

            SerializedAudioChunk.Chunk chunk = new SerializedAudioChunk.Chunk();
            List<SerializedAudioChunk.ChunkResource> resourceList = new ArrayList<>();

            for (HeatMap<String, Byte>.Value value : chunkContent.getContext().getValues()) {
                SerializedAudioChunk.ChunkResource resource = new SerializedAudioChunk.ChunkResource();
                resource.setScore(value.getScore());
                resource.setSource(value.getValue());
                resource.setLastPing(value.getPingedAt());

                resourceList.add(resource);
            }

            chunk.setResources(resourceList);
            map.put(chunkId, chunkContent);
        }

        return chunkMap;
    }

    public void explodeInto(SerializedAudioChunk.ChunkMap chunkMap, HeatMap<String, HeatMap<String, Byte>> curentMap) {
        for (Map.Entry<String, SerializedAudioChunk.Chunk> entry : chunkMap.getData().entrySet()) {
            String chunkId = entry.getKey();
            SerializedAudioChunk.Chunk chunk = entry.getValue();

            HeatMap<String, Byte> byteHeatMap = curentMap.get(chunkId).getContext();

            for (SerializedAudioChunk.ChunkResource resource : chunk.getResources()) {
                byteHeatMap.forceValue(
                        resource.getSource(),
                        resource.getLastPing(),
                        resource.getScore()
                );
            }

            byteHeatMap.clean();
            curentMap.get(chunkId).setContext(byteHeatMap);
        }
    }

}
