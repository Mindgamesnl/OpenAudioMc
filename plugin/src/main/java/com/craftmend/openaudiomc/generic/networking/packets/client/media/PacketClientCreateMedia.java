package com.craftmend.openaudiomc.generic.networking.packets.client.media;

import com.craftmend.openaudiomc.generic.media.objects.Sound;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.media.ClientCreateMediaPayload;

public class PacketClientCreateMedia extends AbstractPacket {

    public PacketClientCreateMedia(Sound media) {
        super(new ClientCreateMediaPayload(media), PacketChannel.CLIENT_OUT_CREATE_MEDIA, null);
    }

    public PacketClientCreateMedia(Sound media, int distance, int maxDistance) {
        super(new ClientCreateMediaPayload(media, distance, maxDistance), PacketChannel.CLIENT_OUT_CREATE_MEDIA, null);
    }

}
