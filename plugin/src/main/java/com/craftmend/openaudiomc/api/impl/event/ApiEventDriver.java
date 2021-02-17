package com.craftmend.openaudiomc.api.impl.event;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

public class ApiEventDriver {

    private HashMap<Class<? extends AudioEvent>, Set<HandlerHolder<? extends AudioEvent>>> handlers = new HashMap<>();

    private Set<HandlerHolder<? extends AudioEvent>> getHandlersFor(Class<? extends AudioEvent> eventClass) {
        return  handlers.getOrDefault(eventClass, new HashSet<>());
    }

    public <T extends AudioEvent> HandlerHolder<T> on(Class<T> eventType) {
        HandlerHolder<T> holder = new HandlerHolder(eventType);
        Set<HandlerHolder<? extends AudioEvent>> subscribers = getHandlersFor(eventType);
        subscribers.add(holder);
        handlers.put(eventType, subscribers);
        return holder;
    }

    public <T extends AudioEvent> T fire(T event) {
        // get handlers
        Set<HandlerHolder<? extends AudioEvent>> subscribers = getHandlersFor(event.getClass());
        for (HandlerHolder<? extends AudioEvent> subscriber : subscribers) {
            if (subscriber.getHandler() == null) {
                throw new IllegalStateException("There was a subscriber for " + event.getClass().getSimpleName() + " that doesn't have an executor! moving on.");
            } else {
                try {
                    subscriber.call(event);
                } catch (Exception e) {
                    OpenAudioLogger.toConsole("Failed to handle an event handler");
                    e.printStackTrace();
                }
            }
        }
        return event;
    }

}
