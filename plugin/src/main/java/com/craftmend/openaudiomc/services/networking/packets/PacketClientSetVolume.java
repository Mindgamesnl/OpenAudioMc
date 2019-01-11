package com.craftmend.openaudiomc.services.networking.packets;

import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.services.networking.payloads.ClientVolumePayload;

public class PacketClientSetVolume extends AbstractPacket {

    public PacketClientSetVolume(int volume) {
        super(
                new ClientVolumePayload(volume),
                PacketChannel.CLIENT_OUT_SET_VOLUME,
                null
        );
    }

}
