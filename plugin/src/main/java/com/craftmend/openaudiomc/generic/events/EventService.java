package com.craftmend.openaudiomc.generic.events;

import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.BaseEvent;
import com.craftmend.openaudiomc.api.events.SingleHandler;
import com.craftmend.openaudiomc.generic.service.Service;

public class EventService extends Service implements EventApi {
    @Override
    public void registerHandlers(Object listener) {

    }

    @Override
    public void unregisterHandlers(Object listener) {

    }

    @Override
    public BaseEvent callEvent(BaseEvent event) {
        return null;
    }

    @Override
    public <T extends BaseEvent> void registerHandler(Class<T> event, SingleHandler<T> handler) {

    }
}
