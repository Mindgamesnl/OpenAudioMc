package com.craftmend.openaudiomc.modules.networking.packets;

import com.craftmend.openaudiomc.modules.media.objects.MediaUpdate;
import com.craftmend.openaudiomc.modules.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.modules.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.modules.networking.payloads.ClientUpdateMediaPayload;

public class PacketClientUpdateMedia extends AbstractPacket {

    public PacketClientUpdateMedia(MediaUpdate update) {
        super(new ClientUpdateMediaPayload(update), PacketChannel.CLIENT_OUT_UPDATE_MEDIA, null);
    }

}
