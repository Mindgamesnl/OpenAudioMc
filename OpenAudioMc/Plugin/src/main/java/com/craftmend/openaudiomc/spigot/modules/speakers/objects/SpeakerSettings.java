package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpeakerSettings {

    private String source;
    private int radius;

}
