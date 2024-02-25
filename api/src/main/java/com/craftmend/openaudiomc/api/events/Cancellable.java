package com.craftmend.openaudiomc.api.events;

/**
 * Represents an event that can be cancelled
 */
public interface Cancellable {

    /**
     * Check if the event is cancelled
     * @return true if the event is cancelled
     */
    boolean isCancelled();

    /**
     * Set the event to cancelled
     * @param cancelled true if the event should be cancelled
     */
    void setCancelled(boolean cancelled);

}
