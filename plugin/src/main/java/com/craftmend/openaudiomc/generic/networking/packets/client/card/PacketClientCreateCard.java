package com.craftmend.openaudiomc.generic.networking.packets.client.card;

import com.craftmend.openaudiomc.generic.cards.objects.Card;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.enums.PacketChannel;
import com.craftmend.openaudiomc.generic.networking.payloads.out.card.ClientCreateCardPayload;

public class PacketClientCreateCard extends AbstractPacket {

    public PacketClientCreateCard(Card card) {
        super(new ClientCreateCardPayload(
                card.toJson()),
                PacketChannel.CLIENT_OUT_CREATE_CARD,
                null
        );
    }

}
