package com.craftmend.openaudiomc.services.networking.packets;

import com.craftmend.openaudiomc.modules.media.objects.MediaUpdate;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.services.networking.payloads.ClientUpdateMediaPayload;

public class PacketClientUpdateMedia extends AbstractPacket {

    public PacketClientUpdateMedia(MediaUpdate update) {
        super(new ClientUpdateMediaPayload(update), PacketChannel.CLIENT_OUT_UPDATE_MEDIA, null);
    }

}
