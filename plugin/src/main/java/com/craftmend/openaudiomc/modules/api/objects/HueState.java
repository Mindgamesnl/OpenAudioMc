package com.craftmend.openaudiomc.modules.api.objects;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@NoArgsConstructor
public class HueState {

    @Getter private Map<Byte, HueColor> colorMap = new HashMap<>();

    /**
     * add a color to this set, more like a scene
     *
     * @param id the light id in the room, starting at 1
     * @param color the HueColor object
     * @return instance of self
     */
    public HueState setLight(byte id, HueColor color) {
        this.colorMap.put(id, color);
        return this;
    }

}
