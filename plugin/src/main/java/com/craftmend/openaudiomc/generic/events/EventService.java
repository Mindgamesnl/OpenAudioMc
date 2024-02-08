package com.craftmend.openaudiomc.generic.events;

import com.craftmend.openaudiomc.api.EventApi;
import com.craftmend.openaudiomc.api.events.BaseEvent;
import com.craftmend.openaudiomc.api.events.Handler;
import com.craftmend.openaudiomc.api.events.SingleHandler;
import com.craftmend.openaudiomc.generic.events.internal.EventMethod;
import com.craftmend.openaudiomc.generic.service.Service;
import lombok.SneakyThrows;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class EventService extends Service implements EventApi {

    private final Map<Class<? extends BaseEvent>, List<EventMethod>> eventHandlers = new HashMap<>();

    @Override
    public void registerHandlers(Object listener) {
        for (Method method : listener.getClass().getMethods()) {
            if (method.isAnnotationPresent(Handler.class) && method.getParameterCount() == 1) {
                registerHandler(method, listener);
            }
        }
    }

    @Override
    public void unregisterHandlers(Object listener) {
        for (List<EventMethod> eventMethods : eventHandlers.values()) {
            eventMethods.removeIf(eventMethod -> eventMethod.matchesHolder(listener));
        }
    }

    private void registerHandler(Method method, Object listener) {
        Class<?> eventType = method.getParameterTypes()[0];
        if (!BaseEvent.class.isAssignableFrom(eventType)) {
            throw new IllegalArgumentException("Event handler " + method.getName() + " in " + listener.getClass().getSimpleName() + " has an invalid parameter type");
        }
        eventHandlers.computeIfAbsent((Class<? extends BaseEvent>) eventType, k -> new ArrayList<>()).add(new EventMethod(listener, method));
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
        registerHandler(m, handler);
    }
}
