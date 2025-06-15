package com.craftmend.openaudiomc.generic.networking.payloads.in.objects;

import java.util.List;

public class MixerTrack {
    private String name;
    private List<String> tags;

    public String getName() {
        return this.name;
    }

    public List<String> getTags() {
        return this.tags;
    }

    public MixerTrack() {
    }
}
