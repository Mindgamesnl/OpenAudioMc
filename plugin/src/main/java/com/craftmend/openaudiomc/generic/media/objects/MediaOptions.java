package com.craftmend.openaudiomc.generic.media.objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class MediaOptions {

    private boolean loop = false;
    private String id;
    private int expirationTimeout = -1;
    private boolean pickUp = true;
    private int fadeTime = 0;
    private int volume = 100;
    private List<AudioNode> effectNodes = new LinkedList<>();

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

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class AudioNode {
        // properties for the node
        private Map<String, Float> properties = new HashMap<>();
        // js class of the audio node
        private String nodeType;
    }

}
