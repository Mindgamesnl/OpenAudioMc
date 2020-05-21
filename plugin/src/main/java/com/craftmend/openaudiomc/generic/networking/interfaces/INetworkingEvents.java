package com.craftmend.openaudiomc.generic.networking.interfaces;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;

public interface INetworkingEvents {

    default void onPacketSend(ClientConnection target, AbstractPacket packet) {}

}
