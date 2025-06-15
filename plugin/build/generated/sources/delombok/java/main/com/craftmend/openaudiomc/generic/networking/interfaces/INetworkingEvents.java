package com.craftmend.openaudiomc.generic.networking.interfaces;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacket;

public interface INetworkingEvents {

    default void onPacketSend(Authenticatable target, AbstractPacket packet) {}
    default void onClientOpen(Authenticatable target) {}
    default void onClientClose(Authenticatable target) {}

}
