package com.craftmend.openaudiomc.api.events;

/**
 * Represents an event that can be cancelled
 */
public class CancellableEvent extends BaseEvent implements Cancellable {

    private boolean cancelled = false;

    @Override
    public boolean isCancelled() {
        return cancelled;
    }

    @Override
    public void setCancelled(boolean cancelled) {
        this.cancelled = cancelled;
    }
}
