package com.craftmend.openaudiomc.api.speakers;

import lombok.Getter;

/**
 * Represents a speaker type
 */
public enum SpeakerType {

    SPEAKER_2D("2D", "Only bases volume on distance"),
    SPEAKER_3D("3D", "Surround sound based on speaker");

    @Getter private String name;
    @Getter private String description;

    SpeakerType(String a, String b) {
        this.name = a;
        this.description = b;
    }


}
