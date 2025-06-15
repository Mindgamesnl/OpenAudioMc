package com.craftmend.openaudiomc.generic.platform.debug;

public abstract class DebugStatistic {
    private final String title;
    private final String description;

    public abstract String computeValue();

    public DebugStatistic(final String title, final String description) {
        this.title = title;
        this.description = description;
    }

    public String getTitle() {
        return this.title;
    }

    public String getDescription() {
        return this.description;
    }
}
