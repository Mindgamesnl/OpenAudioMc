package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientPlayerLocationPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientUpdateCardPayload;

public class PacketClientUpdateLocation extends AbstractPacket {

    public PacketClientUpdateLocation(ClientPlayerLocationPayload locationPayload) {
        super(
                locationPayload,
                PacketChannel.CLIENT_OUT_PLAYER_LOCATION,
                null
        );
    }

}
