package com.craftmend.openaudiomc.spigot.modules.predictive.sorage;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.openaudiomc.spigot.modules.predictive.serialization.SerializedAudioChunk;
import com.craftmend.storm.api.markers.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StoredWorldChunk extends DataStore {

    @Column
    private String chunkName;

    @Column(
            storeAsBlob = true
    )
    private SerializedAudioChunk.Chunk audioChunk;

}
