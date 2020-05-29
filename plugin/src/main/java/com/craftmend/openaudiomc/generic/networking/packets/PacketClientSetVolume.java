package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.out.ui.ClientVolumePayload;

public class PacketClientSetVolume extends AbstractPacket {

    public PacketClientSetVolume(int volume) {
        super(
                new ClientVolumePayload(volume),
                PacketChannel.CLIENT_OUT_SET_VOLUME,
                null
        );
    }

}
