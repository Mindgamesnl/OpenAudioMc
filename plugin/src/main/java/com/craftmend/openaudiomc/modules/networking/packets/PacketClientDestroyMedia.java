package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.modules.networking.payloads.ClientDestroyMediaPayload;

public class PacketClientDestroyMedia extends AbstractPacket {

    public PacketClientDestroyMedia(String soundId) {
        super(new ClientDestroyMediaPayload(soundId), PacketChannel.CLIENT_OUT_DESTROY_MEDIA, null);
    }

}
