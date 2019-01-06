package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.hue.objects.HueColor;
import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.modules.networking.payloads.HueColorPayload;

public class PacketClientApplyHueColor extends AbstractPacket {

    public PacketClientApplyHueColor(HueColor color, String lights) {
        super(
                new HueColorPayload(lights, color),
                PacketChannel.CLIENT_OUT_SET_HUE,
                null
        );
    }

}
