package com.craftmend.oamapmigrator.database.models;

import com.craftmend.oamapmigrator.database.internal.LegacyStore;
import com.craftmend.openaudiomc.spigot.modules.predictive.serialization.SerializedAudioChunk;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StoredWorldChunk extends LegacyStore {

    private String chunkName;
    private SerializedAudioChunk.Chunk audioChunk;

}
