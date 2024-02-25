package com.craftmend.openaudiomc.generic.networking.packets.client.media;

import com.craftmend.openaudiomc.generic.media.objects.MediaUpdate;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.media.ClientUpdateMediaPayload;

public class PacketClientUpdateMedia extends AbstractPacket {

    public PacketClientUpdateMedia(MediaUpdate update) {
        super(new ClientUpdateMediaPayload(update), PacketChannel.CLIENT_OUT_UPDATE_MEDIA, null);
        this.queueableIfReconnecting = true;
    }

}
