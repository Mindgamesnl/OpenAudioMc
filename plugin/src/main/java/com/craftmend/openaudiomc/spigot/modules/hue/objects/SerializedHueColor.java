package com.craftmend.openaudiomc.spigot.modules.hue.objects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SerializedHueColor {

    private int r;
    private int g;
    private int b;
    private int bir;

}
