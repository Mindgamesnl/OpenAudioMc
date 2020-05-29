package com.craftmend.openaudiomc.generic.networking.packets.client.hue;

import com.craftmend.openaudiomc.generic.hue.SerializedHueColor;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.hue.HueColorPayload;

public class PacketClientApplyHueColor extends AbstractPacket {

    public PacketClientApplyHueColor(SerializedHueColor color, String lights) {
        super(
                new HueColorPayload(lights, color),
                PacketChannel.CLIENT_OUT_SET_HUE,
                null
        );
    }

}
