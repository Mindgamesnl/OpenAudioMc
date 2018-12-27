package com.craftmend.openaudiomc.modules.networking.interfaces;

public interface IPacketHandler<E> {

    void on(E packet);

}
