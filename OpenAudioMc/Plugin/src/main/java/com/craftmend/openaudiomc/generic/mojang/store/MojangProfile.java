package com.craftmend.openaudiomc.generic.mojang.store;

import com.craftmend.openaudiomc.generic.database.internal.DataStore;
import com.craftmend.storm.api.markers.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
public class MojangProfile extends DataStore {

    @Column private String name;
    @Column private UUID uuid;
    @Column
    private Instant lastSeen = null;

}
