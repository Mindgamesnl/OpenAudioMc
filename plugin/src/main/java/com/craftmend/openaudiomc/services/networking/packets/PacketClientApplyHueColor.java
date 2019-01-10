package com.craftmend.openaudiomc.services.networking.packets;

import com.craftmend.openaudiomc.modules.hue.objects.HueColor;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.services.networking.payloads.HueColorPayload;

public class PacketClientApplyHueColor extends AbstractPacket {

    public PacketClientApplyHueColor(HueColor color, String lights) {
        super(
                new HueColorPayload(lights, color),
                PacketChannel.CLIENT_OUT_SET_HUE,
                null
        );
    }

}
