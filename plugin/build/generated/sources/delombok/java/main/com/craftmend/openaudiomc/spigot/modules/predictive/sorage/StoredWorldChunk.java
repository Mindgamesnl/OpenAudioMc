package com.craftmend.openaudiomc.spigot.modules.predictive.sorage;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.openaudiomc.spigot.modules.predictive.serialization.SerializedAudioChunk;
import com.craftmend.storm.api.markers.Column;

public class StoredWorldChunk extends DataStore {
    @Column
    private String chunkName;
    @Column(storeAsBlob = true)
    private SerializedAudioChunk.Chunk audioChunk;

    public String getChunkName() {
        return this.chunkName;
    }

    public SerializedAudioChunk.Chunk getAudioChunk() {
        return this.audioChunk;
    }

    public StoredWorldChunk() {
    }

    public StoredWorldChunk(final String chunkName, final SerializedAudioChunk.Chunk audioChunk) {
        this.chunkName = chunkName;
        this.audioChunk = audioChunk;
    }
}
