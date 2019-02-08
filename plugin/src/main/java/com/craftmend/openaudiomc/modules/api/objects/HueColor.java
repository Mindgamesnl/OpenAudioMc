package com.craftmend.openaudiomc.modules.api.objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HueColor {

    private byte red = 0;
    private byte green = 0;
    private byte blue = 0;
    private byte brightness = 0;

    public static HueColor fromRgb(byte red, byte green, byte blue, byte brightness) {
        return new HueColor(red, green, blue, brightness);
    }

    public static HueColor fromColor(Color color) {
        return new HueColor((byte) color.getRed(), (byte) color.getGreen(), (byte) color.getBlue(), (byte) color.getAlpha());
    }

}
