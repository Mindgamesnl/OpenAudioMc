package com.craftmend.openaudiomc.generic.networking.packets.client.media;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.abstracts.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.media.ClientPreFetchPayload;

public class PacketClientPreFetch extends AbstractPacket {

    public PacketClientPreFetch(String source, boolean keepCopy) {
        super(new ClientPreFetchPayload(source, "automatic", false, keepCopy), PacketChannel.CLIENT_OUT_PREFETCH, null);
    }

    public PacketClientPreFetch(boolean clear) {
        super(new ClientPreFetchPayload(null, "automatic", clear, false), PacketChannel.CLIENT_OUT_PREFETCH, null);
    }

    public PacketClientPreFetch(ClientPreFetchPayload payload) {
        super(payload, PacketChannel.CLIENT_OUT_PREFETCH, null);
    }

}
