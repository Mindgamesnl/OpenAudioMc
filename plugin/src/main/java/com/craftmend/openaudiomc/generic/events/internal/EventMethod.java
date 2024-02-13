package com.craftmend.openaudiomc.generic.events.internal;


import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import lombok.Getter;

import java.lang.reflect.Method;

public class EventMethod {

    @Getter private Object holder;
    private Method method;

    public EventMethod(Object holder, Method method) {
        this.holder = holder;
        this.method = method;
        this.method.setAccessible(true);
    }

    public boolean matchesHolder(Object holder) {
        return this.holder.equals(holder);
    }

    public void invoke(Object event) {
        try {
            method.invoke(holder, event);
        } catch (Exception e) {
            OpenAudioLogger.error(e, "Failed to invoke event handler " + method.getName() + " in " + holder.getClass().getSimpleName());
        }
    }

}
