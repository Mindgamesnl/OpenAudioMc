package com.craftmend.openaudiomc.api.impl.event;

public interface Handler<T> {

    void onEvent(T event);

}
