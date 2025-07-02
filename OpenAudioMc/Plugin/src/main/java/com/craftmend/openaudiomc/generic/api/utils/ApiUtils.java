package com.craftmend.openaudiomc.generic.api.utils;

import com.craftmend.openaudiomc.api.clients.Client;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;

public class ApiUtils {

    public static ClientConnection validateClient(Client client) {
        if (!(client instanceof ClientConnection)) throw new IllegalStateException("This player isn't a instance of ClientConnection");
        return (ClientConnection) client;
    }

}
