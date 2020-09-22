package com.craftmend.openaudiomc.spigot.modules.predictive.serialization;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SerializedAudioChunk {

    @Setter
    @Getter
    @NoArgsConstructor
    public static class ChunkMap {
        private Map<String, Chunk> data = new HashMap<>();
    }

    @Setter
    @Getter
    @NoArgsConstructor
    public static class Chunk {
        private List<ChunkResource> resources;
    }

    @Setter
    @Getter
    @NoArgsConstructor
    public static class ChunkResource {
        private String source;
        private Instant lastPing;
        private Integer score;
    }

}
