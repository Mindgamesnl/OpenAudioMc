package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.media.objects.MediaUpdate;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.out.media.ClientUpdateMediaPayload;

public class PacketClientUpdateMedia extends AbstractPacket {

    public PacketClientUpdateMedia(MediaUpdate update) {
        super(new ClientUpdateMediaPayload(update), PacketChannel.CLIENT_OUT_UPDATE_MEDIA, null);
    }

}
