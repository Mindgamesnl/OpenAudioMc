package com.craftmend.openaudiomc.api.events;

/**
 * This is a type templated lambda for single event handlers.
 * See {@link com.craftmend.openaudiomc.api.EventApi} for more information
 */
@FunctionalInterface
public interface SingleHandler<T> {

    @Handler
    void handle(T event);

}
