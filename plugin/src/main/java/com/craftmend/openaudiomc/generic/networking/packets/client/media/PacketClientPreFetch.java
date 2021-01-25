package com.craftmend.openaudiomc.generic.networking.packets.client.media;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.media.ClientPreFetchPayload;

public class PacketClientPreFetch extends AbstractPacket {

    public PacketClientPreFetch(String source) {
        super(new ClientPreFetchPayload(source, false), PacketChannel.CLIENT_OUT_PREFETCH, null);
    }

    public PacketClientPreFetch(boolean clear) {
        super(new ClientPreFetchPayload(null, clear), PacketChannel.CLIENT_OUT_PREFETCH, null);
    }

}
