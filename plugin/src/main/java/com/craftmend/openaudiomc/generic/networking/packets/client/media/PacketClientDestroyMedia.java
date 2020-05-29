package com.craftmend.openaudiomc.generic.networking.packets.client.media;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.out.media.ClientDestroyMediaPayload;

public class PacketClientDestroyMedia extends AbstractPacket {

    public PacketClientDestroyMedia(String soundId, boolean deleteSpecial) {
        super(new ClientDestroyMediaPayload(soundId, deleteSpecial), PacketChannel.CLIENT_OUT_DESTROY_MEDIA, null);
    }

    public PacketClientDestroyMedia(String soundId) {
        super(new ClientDestroyMediaPayload(soundId, false), PacketChannel.CLIENT_OUT_DESTROY_MEDIA, null);
    }

}
