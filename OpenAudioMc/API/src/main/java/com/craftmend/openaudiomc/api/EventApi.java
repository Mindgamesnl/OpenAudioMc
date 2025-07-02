package com.craftmend.openaudiomc.api;

import com.craftmend.openaudiomc.api.events.BaseEvent;
import com.craftmend.openaudiomc.api.events.SingleHandler;

/**
 * This is the event api, which is used to register and call events.
 * We use this instead of the bukkit event system to allow for cross-platform compatibility
 */
public interface EventApi {

    /**
     * Get an instance of the event api. May be null if the plugin is not loaded yet
     * @return instance
     */
    static EventApi getInstance() {
        if (ApiHolder.eventApiInstance == null) {
            throw new IllegalStateException("OpenAudioMc has not been initialized yet");
        }
        return ApiHolder.eventApiInstance;
    }

    /**
     * Register a listener for events annotated with @Handler
     * @param listener the listener to register
     */
    void registerHandlers(Object listener);

    /**
     * Unregister a listener for events annotated with @Handler
     * @param listener the listener to unregister
     */
    void unregisterHandlers(Object listener);

    /**
     * Call an event
     * @param event the event to call
     */
    BaseEvent callEvent(BaseEvent event);

    /**
     * Register a handler for a specific event
     * @param event the event to listen for
     * @param handler the handler to call
     * @param <T> the event type
     */
    <T extends BaseEvent> void registerHandler(Class<T> event, SingleHandler<T> handler);

}
