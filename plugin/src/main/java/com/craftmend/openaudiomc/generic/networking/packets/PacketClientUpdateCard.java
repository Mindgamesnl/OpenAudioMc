package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.cards.objects.Card;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientCreateCardPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientUpdateCardPayload;

public class PacketClientUpdateCard extends AbstractPacket {

    public PacketClientUpdateCard(String id, String part) {
        super(
                new ClientUpdateCardPayload(id, part),
                PacketChannel.CLIENT_OUT_UPDATE_CARD,
                null
        );
    }

}
