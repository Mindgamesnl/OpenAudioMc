package com.craftmend.openaudiomc.generic.events;

import com.craftmend.openaudiomc.api.ApiHolder;
import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.BaseEvent;
import com.craftmend.openaudiomc.api.events.Handler;
import com.craftmend.openaudiomc.api.events.SingleHandler;
import com.craftmend.openaudiomc.generic.events.adapter.LegacyEventAdapter;
import com.craftmend.openaudiomc.generic.events.internal.EventMethod;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.service.Service;
import lombok.SneakyThrows;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class EventService extends Service implements EventApi {

    private final Map<Class<? extends BaseEvent>, List<EventMethod>> eventHandlers = new ConcurrentHashMap<>();

    public EventService() {
        // register register events
        ApiHolder.initiate(this);
        registerHandlers(new LegacyEventAdapter());
    }

    @Override
    public void registerHandlers(Object listener) {
        for (Method method : listener.getClass().getMethods()) {
            if (method.isAnnotationPresent(Handler.class) && method.getParameterCount() == 1) {
                // get type of event
                Class<?> methodType = method.getParameterTypes()[0];
                if (!BaseEvent.class.isAssignableFrom(methodType)) {
                    throw new IllegalArgumentException("Event handler " + method.getName() + " in " + listener.getClass().getSimpleName() + " has an invalid parameter type (" + methodType.getName() + ")");
                }
                registerHandler((Class<? extends BaseEvent>) methodType, method, listener, true);
            }
        }
    }

    @Override
    public void unregisterHandlers(Object listener) {
        for (List<EventMethod> eventMethods : eventHandlers.values()) {
            eventMethods.removeIf(eventMethod -> eventMethod.matchesHolder(listener));
        }
    }

    private void registerHandler(Class<? extends BaseEvent> eventType, Method method, Object listener, boolean enforceType) {
        if (enforceType && !BaseEvent.class.isAssignableFrom(eventType)) {
            throw new IllegalArgumentException("Event handler " + method.getName() + " in " + listener.getClass().getSimpleName() + " has an invalid parameter type (" + eventType.getName() + ")");
        }
        eventHandlers.computeIfAbsent(eventType, k -> new ArrayList<>()).add(new EventMethod(listener, method));
    }

    @Override
    public BaseEvent callEvent(BaseEvent event) {
        List<EventMethod> handlers = eventHandlers.get(event.getClass());
        if (handlers != null && !handlers.isEmpty()) {
            for (EventMethod handler : handlers) {
                handler.invoke(event);
            }
        }
        return event;
    }

    @Override
    @SneakyThrows
    public <T extends BaseEvent> void registerHandler(Class<T> event, SingleHandler<T> handler) {
        // get Method from handler
        Method m = handler.getClass().getMethod("handle", Object.class);
        registerHandler(event, m, handler, false);
    }
}
