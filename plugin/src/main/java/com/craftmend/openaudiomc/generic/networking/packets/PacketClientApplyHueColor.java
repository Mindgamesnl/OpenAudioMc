package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.spigot.modules.hue.objects.SerializedHueColor;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.HueColorPayload;

public class PacketClientApplyHueColor extends AbstractPacket {

    public PacketClientApplyHueColor(SerializedHueColor color, String lights) {
        super(
                new HueColorPayload(lights, color),
                PacketChannel.CLIENT_OUT_SET_HUE,
                null
        );
    }

}
