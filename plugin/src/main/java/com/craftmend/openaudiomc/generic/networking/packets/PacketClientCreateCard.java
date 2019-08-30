package com.craftmend.openaudiomc.generic.networking.packets;

import com.craftmend.openaudiomc.generic.cards.objects.Card;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientCreateCardPayload;

public class PacketClientCreateCard extends AbstractPacket {

    public PacketClientCreateCard(Card card) {
        super(new ClientCreateCardPayload(
                card.toJson()),
                PacketChannel.CLIENT_OUT_CREATE_CARD,
                null
        );
    }

}
