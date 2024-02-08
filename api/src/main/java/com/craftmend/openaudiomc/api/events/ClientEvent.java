package com.craftmend.openaudiomc.api.events;

public class ClientEvent extends BaseEvent {

        private final String client;

        /**
         * Create a new client event
         * @param client the client that this event is about
         */
        public ClientEvent(String client) {
            this.client = client;
        }

        /**
         * Get the client that this event is about
         * @return the client
         */
        public String getClient() {
            return client;
        }
}
