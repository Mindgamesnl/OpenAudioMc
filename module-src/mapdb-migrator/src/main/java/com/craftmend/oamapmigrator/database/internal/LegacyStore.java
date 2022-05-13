package com.craftmend.oamapmigrator.database.internal;

import lombok.Getter;
import lombok.Setter;

public abstract class LegacyStore {

    @Getter @Setter private String originalName;

}
