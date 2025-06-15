package com.craftmend.openaudiomc.spigot.modules.predictive.serialization;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SerializedAudioChunk {

    public static class ChunkMap {
        private Map<String, Chunk> data = new HashMap<>();

        public void setData(final Map<String, Chunk> data) {
            this.data = data;
        }

        public Map<String, Chunk> getData() {
            return this.data;
        }

        public ChunkMap() {
        }
    }


    public static class Chunk {
        private List<ChunkResource> resources;

        public void setResources(final List<ChunkResource> resources) {
            this.resources = resources;
        }

        public List<ChunkResource> getResources() {
            return this.resources;
        }

        public Chunk() {
        }

        public Chunk(final List<ChunkResource> resources) {
            this.resources = resources;
        }
    }


    public static class ChunkResource {
        private String source;
        private Instant lastPing;
        private Integer score;

        public void setSource(final String source) {
            this.source = source;
        }

        public void setLastPing(final Instant lastPing) {
            this.lastPing = lastPing;
        }

        public void setScore(final Integer score) {
            this.score = score;
        }

        public String getSource() {
            return this.source;
        }

        public Instant getLastPing() {
            return this.lastPing;
        }

        public Integer getScore() {
            return this.score;
        }

        public ChunkResource() {
        }
    }
}
