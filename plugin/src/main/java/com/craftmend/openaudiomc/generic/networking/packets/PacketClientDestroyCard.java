package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientDestroyCardPayload;

public class PacketClientDestroyCard extends AbstractPacket {

    public PacketClientDestroyCard() {
        super(
                new ClientDestroyCardPayload(),
                PacketChannel.CLIENT_OUT_DESTROY_CARD,
                null
        );
    }

}
