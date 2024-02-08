package com.craftmend.openaudiomc.api.events;

public interface SingleHandler<T> {

    void handle(T event);

}
