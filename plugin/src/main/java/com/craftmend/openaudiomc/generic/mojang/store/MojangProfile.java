package com.craftmend.openaudiomc.generic.mojang.store;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@AllArgsConstructor
public class MojangProfile extends DataStore {

    private String name;
    private UUID uuid;
    private Instant lastSeen = null;

}
