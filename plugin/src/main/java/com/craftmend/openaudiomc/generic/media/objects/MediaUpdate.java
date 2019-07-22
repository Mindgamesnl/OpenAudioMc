package com.craftmend.openaudiomc.generic.media.objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MediaUpdate {

    private int distance = 100;
    private int maxDistance = 100;
    private int fadeTime = 0;
    private String target = "";

}
