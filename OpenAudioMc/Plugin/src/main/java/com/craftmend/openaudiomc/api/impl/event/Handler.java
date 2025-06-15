package com.craftmend.openaudiomc.api.impl.event;

/**
 * Basic interface which is used to carry an event handler
 * @param <T> Is the specific event that its calling, which is specified by the event driver.
 */
@Deprecated
public interface Handler<T> {

    void onEvent(T event);

}
