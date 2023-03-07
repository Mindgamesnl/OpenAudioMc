package com.craftmend.oamapmigrator.database.models;

import com.craftmend.oamapmigrator.database.internal.LegacyStore;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegionProperties extends LegacyStore {

    private String source;
    private int volume;
    private int fadeTimeMs;
    private boolean allowsVoiceChat = true;
    private String regionName;

}
