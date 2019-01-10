package com.craftmend.openaudiomc.services.networking.packets;

import com.craftmend.openaudiomc.modules.media.objects.Media;
import com.craftmend.openaudiomc.services.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.services.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.services.networking.payloads.ClientCreateMediaPayload;

public class PacketClientCreateMedia extends AbstractPacket {

    public PacketClientCreateMedia(Media media) {
        super(new ClientCreateMediaPayload(media), PacketChannel.CLIENT_OUT_CREATE_MEDIA, null);
    }

    public PacketClientCreateMedia(Media media, int distance, int maxDistance) {
        super(new ClientCreateMediaPayload(media, distance, maxDistance), PacketChannel.CLIENT_OUT_CREATE_MEDIA, null);
    }

}
