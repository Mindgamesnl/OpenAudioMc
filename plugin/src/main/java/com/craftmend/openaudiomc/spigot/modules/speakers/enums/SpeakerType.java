package com.craftmend.openaudiomc.spigot.modules.speakers.enums;

import lombok.Getter;

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
