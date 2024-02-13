package com.craftmend.openaudiomc.api.impl.event;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.OpenAudioMcBuild;
import com.craftmend.openaudiomc.api.impl.event.enums.EventSupport;
import com.craftmend.openaudiomc.api.interfaces.EventSupportFlag;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.Platform;
import lombok.SneakyThrows;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * This is a stupidly simple event driver, replacing the Bukkit event system
 * for internal and api purposes.
 * <p>
 * Key feature is the fact that it doesn't depend on any bukkit/spigot services, making it save
 * and functional on other platforms as well (bungee, velocity, testing)
 */
@Deprecated
public class ApiEventDriver {

    /**
     * Cache for reflected event support lookups
     */
    @Deprecated
    private final Map<Class<? extends AudioEvent>, EventSupport> eventSupportCache = new HashMap<>();

    /**
     * This maps raw event implementation classes to a set of handler holders of the same type
     * note that this isn't a concurrent hashmap, which shouldn't really be a problem since I don't
     * expect that there'll be events registered during normal application flow, but is important
     * since most (if not all) events are async for networking and platform reasons.
     */
    @Deprecated
    private final HashMap<Class<? extends AudioEvent>, Set<HandlerHolder<? extends AudioEvent>>> handlers = new HashMap<>();

    /**
     * This attempts to fetch the event type from a class, but this requires the class to have a public constructor
     * this should be covered by a unit test, so can be done safely
     *
     * @param event Event class
     * @return Event support type
     */
    @Deprecated
    public EventSupport getEventSupportFor(Class<? extends AudioEvent> event) throws InstantiationException, IllegalAccessException {
        if (eventSupportCache.containsKey(event)) return eventSupportCache.get(event);
        EventSupport s = null;
        // attempt to get it from an annotation
        if (event.isAnnotationPresent(EventSupportFlag.class)) {
            s = event.getAnnotation(EventSupportFlag.class).support();
        }
        if (s == null) {
            s = EventSupport.UNKNOWN;
        }
        eventSupportCache.put(event, s);
        return s;
    }

    /**
     * Internal method to find listeners for a specific event.
     *
     * @param eventClass Specific event implementation to match
     * @return A collection of callable event listeners, or an empty set if there are none.
     */
    @Deprecated
    private Set<HandlerHolder<? extends AudioEvent>> getHandlersFor(Class<? extends AudioEvent> eventClass) {
        return handlers.getOrDefault(eventClass, new HashSet<>());
    }

    /**
     * Public API method to create an event listener for a specific event.
     * This returns a new event holder, which will store your event callback.
     *
     * @param eventType The event type you want to listen for
     * @return Your new event handler, which you can fill using the `setHandler` method
     */
    @Deprecated
    @SneakyThrows
    public <T extends AudioEvent> HandlerHolder<T> on(Class<T> eventType) {

        // get the caller class name, method name and line number
        StackTraceElement[] stacktrace = Thread.currentThread().getStackTrace();
        StackTraceElement e = stacktrace[2];
        String methodThatInvoked = e.getMethodName();
        String classThatInvoked = e.getClassName();
        int lineThatInvoked = e.getLineNumber();
        OpenAudioLogger.warn("Deprecated event listener registration, please use the new event system. Invoked from " + classThatInvoked + "#" + methodThatInvoked + ":" + lineThatInvoked);

        // check if this event is supported here
        EventSupport support = getEventSupportFor(eventType);
        // is the plugin real?
        if (!OpenAudioMcBuild.IS_TESTING) {
            if (OpenAudioMc.getInstance() != null) {
                if (!isSupported(support, OpenAudioMc.getInstance().getPlatform(), OpenAudioMc.getInstance().getInvoker().isNodeServer())) {
                    throw new IllegalStateException(support.getErrorMessage());
                }
            }
        }

        HandlerHolder<T> holder = new HandlerHolder(eventType);
        Set<HandlerHolder<? extends AudioEvent>> subscribers = getHandlersFor(eventType);
        subscribers.add(holder);
        handlers.put(eventType, subscribers);
        return holder;
    }

    /**
     * Fires an event for all listeners of the same type, and shares the same instance between all of them.
     * Individual listeners will be caught if they throw an exception, as to not disturb or break the flow.
     *
     * @param event instance to fire
     * @return instance that got fired, possibly mutated if the event was cancellable or had any other setters
     */
    @Deprecated
    public <T extends AudioEvent> T fire(T event) {
        // get handlers
        Set<HandlerHolder<? extends AudioEvent>> subscribers = getHandlersFor(event.getClass());
        for (HandlerHolder<? extends AudioEvent> subscriber : subscribers) {
            if (subscriber.getHandler() != null) {
                try {
                    subscriber.call(event);
                } catch (Exception e) {
                    OpenAudioLogger.error(e, "Failed to handle an event (" + event.getClass().getSimpleName() + ") handler in " + subscriber.getHandler().getClass().getName());
                }
            }
        }

        return event;
    }

    @Deprecated
    public boolean isSupported(EventSupport supportType, Platform platform, boolean isNode) {
        switch (supportType) {
            case UNKNOWN:
                return false;

            case EVERYWHERE:
                return true;

            case PROXY_ONLY:
                return platform == Platform.BUNGEE || platform == Platform.VELOCITY || platform == Platform.STANDALONE;

            case SPIGOT_ONLY:
                return platform == Platform.SPIGOT || platform == Platform.STANDALONE;

            case ONLY_PROXY_IF_AVAILABLE:
                if ((platform == Platform.SPIGOT && !isNode) || platform == Platform.STANDALONE) {
                    return true;
                }

                return platform == Platform.BUNGEE || platform == Platform.VELOCITY;
        }
        return false;
    }

    @Deprecated
    public boolean isSupported(Class<? extends AudioEvent> af) {
        try {
            return isSupported(getEventSupportFor(af), OpenAudioMc.getInstance().getPlatform(), OpenAudioMc.getInstance().getInvoker().isNodeServer());
        } catch (InstantiationException | IllegalAccessException e) {
            return false;
        }
    }
}
