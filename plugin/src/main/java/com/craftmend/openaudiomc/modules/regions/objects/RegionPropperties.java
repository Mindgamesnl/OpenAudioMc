package com.craftmend.openaudiomc.modules.regions.objects;

import com.craftmend.openaudiomc.modules.media.objects.Media;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegionPropperties {

    private Media media;

    public RegionPropperties(String source) {
        this.media = new Media(source);
        this.media.setDoPickup(true);
        this.media.setLoop(true);
        this.media.setAutoPlay(true);
    }

}
