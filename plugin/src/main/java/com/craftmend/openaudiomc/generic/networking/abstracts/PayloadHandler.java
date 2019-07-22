package com.craftmend.openaudiomc.generic.networking.abstracts;

public abstract class PayloadHandler<E> {

    /**
     * used for handlers
     * you can ignore the unchecked cast, thats because this class does not have
     * a final pre defined type, but it's E because you can use anything really, it's only an instance AbstractPacket
     * @param packet packet
     */
    public void trigger(AbstractPacket packet) {
        onReceive((E) packet.getData());
    }

    public abstract void onReceive(E payload);

}
