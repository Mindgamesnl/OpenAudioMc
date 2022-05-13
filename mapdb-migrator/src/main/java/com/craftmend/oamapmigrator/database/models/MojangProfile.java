package com.craftmend.oamapmigrator.database.models;

import com.craftmend.oamapmigrator.database.internal.LegacyStore;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@AllArgsConstructor
public class MojangProfile extends LegacyStore {

    private String name;
    private UUID uuid;
    private Instant lastSeen = null;

}
