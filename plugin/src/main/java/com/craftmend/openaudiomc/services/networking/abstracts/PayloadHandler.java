package com.craftmend.openaudiomc.modules.networking.abstracts;

public abstract class PayloadHandler<E> {


    public void trigger(AbstractPacket packet) {
        onReceive((E) packet.getData());
    }

    public abstract void onReceive(E payload);

}
