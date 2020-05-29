package com.craftmend.openaudiomc.generic.networking.packets.client.ui;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.client.ui.ClientVersionPayload;

public class PacketClientProtocolRevisionPacket extends AbstractPacket {

    public PacketClientProtocolRevisionPacket() {
        super(new ClientVersionPayload(), PacketChannel.CLIENT_OUT_SET_PROTOCOL_VERSION, null);
    }
}
