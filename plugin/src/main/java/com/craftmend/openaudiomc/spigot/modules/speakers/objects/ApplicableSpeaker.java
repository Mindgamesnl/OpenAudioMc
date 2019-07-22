package com.craftmend.openaudiomc.spigot.modules.speakers.objects;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplicableSpeaker {

    private int distance;
    private Speaker speaker;

}
