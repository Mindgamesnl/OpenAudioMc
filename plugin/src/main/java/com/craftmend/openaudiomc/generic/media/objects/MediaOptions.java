package com.craftmend.openaudiomc.generic.media.objects;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MediaOptions {

    private Boolean loop = false;
    private String id;
    private int expirationTimeout = -1;
    private Boolean pickUp = true;
    private int fadeTime = 0;

}
