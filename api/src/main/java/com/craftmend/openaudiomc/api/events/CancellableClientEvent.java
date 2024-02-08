package com.craftmend.openaudiomc.api.events;

public class CancellableClientEvent extends ClientEvent implements Cancellable {

    private boolean cancelled = false;

    /**
     * Create a new client event
     *
     * @param client the client that this event is about
     */
    public CancellableClientEvent(String client) {
        super(client);
    }

    @Override
    public boolean isCancelled() {
        return cancelled;
    }

    @Override
    public void setCancelled(boolean cancelled) {
        this.cancelled = cancelled;
    }
}
