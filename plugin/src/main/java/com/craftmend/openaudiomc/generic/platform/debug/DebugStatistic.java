package com.craftmend.openaudiomc.generic.platform.debug;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public abstract class DebugStatistic {

    @Getter private final String title;
    @Getter private final String description;

    public abstract String computeValue();

}
