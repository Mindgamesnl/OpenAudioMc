package com.craftmend.openaudiomc.generic.api;

import com.craftmend.openaudiomc.api.ApiHolder;
import com.craftmend.openaudiomc.generic.api.implementaions.ClientApiImpl;
import com.craftmend.openaudiomc.generic.api.implementaions.MediaApiImpl;
import com.craftmend.openaudiomc.generic.api.implementaions.VoiceApiImpl;
import com.craftmend.openaudiomc.generic.api.implementaions.WorldApiImpl;
import com.craftmend.openaudiomc.generic.events.EventService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;

public class ApiService extends Service {

    @Inject
    public ApiService(
            NetworkingService networkingService
    ) {
        // initialize api
        ApiHolder.initiate(new ClientApiImpl(networkingService));
        ApiHolder.initiate(new WorldApiImpl());
        ApiHolder.initiate(new VoiceApiImpl());
        ApiHolder.initiate(new MediaApiImpl());
    }

}
