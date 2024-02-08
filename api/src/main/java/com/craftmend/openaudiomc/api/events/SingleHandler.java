package com.craftmend.openaudiomc.api.events;

public interface SingleHandler<T> {

    @Handler
    void handle(T event);

}
