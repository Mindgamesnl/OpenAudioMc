package com.craftmend.openaudiomc.services.networking.packets;

import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.services.networking.payloads.ClientDestroyMediaPayload;

public class PacketClientDestroyMedia extends AbstractPacket {

    public PacketClientDestroyMedia(String soundId) {
        super(new ClientDestroyMediaPayload(soundId), PacketChannel.CLIENT_OUT_DESTROY_MEDIA, null);
    }

}
