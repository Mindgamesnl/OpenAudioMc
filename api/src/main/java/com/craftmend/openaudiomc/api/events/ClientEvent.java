package com.craftmend.openaudiomc.api.events;

import com.craftmend.openaudiomc.api.clients.Client;

/**
 * Base event for all events carrying a client
 */
public class ClientEvent extends BaseEvent {

        private final Client client;

        /**
         * Create a new client event
         * @param client the client that this event is about
         */
        public ClientEvent(Client client) {
            this.client = client;
        }

        /**
         * Get the client that this event is about
         * @return the client
         */
        public Client getClient() {
            return client;
        }
}
