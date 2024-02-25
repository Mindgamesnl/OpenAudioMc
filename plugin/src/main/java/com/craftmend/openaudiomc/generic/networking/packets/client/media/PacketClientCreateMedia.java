package com.craftmend.openaudiomc.generic.networking.packets.client.media;

import com.craftmend.openaudiomc.api.media.Media;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.media.ClientCreateMediaPayload;

public class PacketClientCreateMedia extends AbstractPacket {

    public PacketClientCreateMedia(Media media) {
        super(new ClientCreateMediaPayload(media), PacketChannel.CLIENT_OUT_CREATE_MEDIA, null);
        this.queueableIfReconnecting = true;
    }

    public PacketClientCreateMedia(Media media, int distance, int maxDistance) {
        super(new ClientCreateMediaPayload(media, distance, maxDistance), PacketChannel.CLIENT_OUT_CREATE_MEDIA, null);
        this.queueableIfReconnecting = true;
    }

}
