package com.craftmend.openaudiomc.api.speakers;

/**
 * Represents a speaker type
 */
public enum SpeakerType {
    SPEAKER_2D("2D", "Only bases volume on distance"), SPEAKER_3D("3D", "Surround sound based on speaker");
    private String name;
    private String description;

    SpeakerType(String a, String b) {
        this.name = a;
        this.description = b;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }
}
