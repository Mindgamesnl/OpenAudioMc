package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientDestroyMediaPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientVersionPayload;

public class PacketClientProtocolRevisionPacket extends AbstractPacket {

    public PacketClientProtocolRevisionPacket() {
        super(new ClientVersionPayload(), PacketChannel.CLIENT_OUT_SET_PROTOCOL_VERSION, null);
    }
}
