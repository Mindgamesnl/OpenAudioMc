package com.craftmend.openaudiomc.modules.api.objects;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@NoArgsConstructor
public class HueState {

    @Getter private Map<Byte, HueColor> colorMap = new HashMap<>();

    public HueState setLight(byte id, HueColor color) {
        this.colorMap.put(id, color);
        return this;
    }

}
