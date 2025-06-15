package com.craftmend.openaudiomc.api.clients;

/**
 * This represents basic authentication data for a client.
 * This data is typically static during a play session, but CAN be forced to regenerate without notice when suspected of being compromised.
 * @since 6.10.11
 */
public interface ClientBaseAuthentication {

    /**
     * This is the token used to authenticate the client, and checked against in the {@link com.craftmend.openaudiomc.api.events.client.ClientAuthenticationEvent}
     * @return Expected play session token
     */
    String getToken();

}
