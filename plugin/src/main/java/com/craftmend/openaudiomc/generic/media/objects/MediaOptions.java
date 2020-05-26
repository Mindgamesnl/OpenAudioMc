package com.craftmend.openaudiomc.generic.media.objects;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MediaOptions {

    private boolean loop = false;
    private String id;
    private int expirationTimeout = -1;
    private boolean pickUp = true;
    private int fadeTime = 0;
    private int volume = 100;

    public OptionalError validate() {
        if (volume > 100)
            return new OptionalError(true, "Volume may not be over 100");

        if (volume < 0)
            return new OptionalError(true, "Volume may not be lower than 0");

        if (volume == 0)
            return new OptionalError(true, "You shouldn't even play it if the volume is 0");

        if (fadeTime < 0)
            return new OptionalError(true, "Fade time can't be negative");

        return new OptionalError(false, "");
    }

}
