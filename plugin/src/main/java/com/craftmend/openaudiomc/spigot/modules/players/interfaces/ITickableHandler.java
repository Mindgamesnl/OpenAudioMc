package com.craftmend.openaudiomc.spigot.modules.players.interfaces;

public interface ITickableHandler {

    void tick();
    default void reset() {
        throw new UnsupportedOperationException("");
    }

}
