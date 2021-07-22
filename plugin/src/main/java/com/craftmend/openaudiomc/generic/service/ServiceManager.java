package com.craftmend.openaudiomc.generic.service;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.SneakyThrows;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

/**
 * The ServiceManager was made in an effort to make the general openaudiomc codebase less shit/spaghetti/spaghetti with shit sauce
 *
 * The old system had main Classes (OpenAudioMc, OpenAudioMcSpigot and OpenAudioMcBungee) loading modules, which are
 * just defined as private fields with getters/setters per "invoker" which makes for a messy codebase, where services have circular dependencies
 * and makes refactoring impossible.
 *
 * The new approach is based on "Services" (much like those in Symfony), where you only need to request them during runtime (or manually start them
 * on boot) and can then request instances (statically) or through an annotated field
 * This means that there'll be one boot class per platform starting a subset of services, which can then just do their thing, instead of
 * constantly pointing back to one of the three old invokers.
 *
 * This can and probably will break some other plugins that depend on openaudiomc, but the currently existing AudioApi interface
 * and ease of use of the new system makes up for it.
 */
public class ServiceManager {

    private Map<Class<?>, Object> otherInjectables = new HashMap<>();
    private Map<Class<? extends Service>, Service> serviceMap = new HashMap<>();

    @SneakyThrows
    public Service loadService(Class<? extends Service> target) {
        // first, check if its already enabled, if so, just re-use that one
        if (isServiceEnabled(target)) {
            return serviceMap.get(target);
        }

        // require an empty constructor, or this will go fucking boom
        Service i = target.getConstructor().newInstance();

        // find annotated injections
        for (Field field : target.getFields()) {
            if (field.isAnnotationPresent(Inject.class)) {
                Object v = resolve(field.getType());

                if (v != null) {
                    if (Service.class.isAssignableFrom(field.getType())) {
                        field.setAccessible(true);
                        field.set(i, v);
                    }
                }
            }
        }

        i.onEnable();
        serviceMap.put(target, i);
        return i;
    }

    public void replaceService(Class<? extends Service> target, Service i) {
        serviceMap.put(target, i);
    }

    public Object resolve(Class<?> type) {
        if (Service.class.isAssignableFrom(type)) {
            // its depended upon
            return loadService((Class<? extends Service>) type);
        } else if (type == OpenAudioMc.class) {
            return OpenAudioMc.getInstance();
        } else {
            if (type.isInterface()) {
                // dont check the value
                for (Class<?> anInterface : type.getInterfaces()) {
                    if (otherInjectables.containsKey(anInterface)) {
                        return otherInjectables.get(anInterface);
                    }
                }
            } else if (otherInjectables.containsKey(type)) {
                return otherInjectables.get(type);
            } else {
                // last option, it extends, somewhere
                for (Map.Entry<Class<?>, Object> entry : otherInjectables.entrySet()) {
                    Class<?> c = entry.getKey();
                    if (c.isAssignableFrom(type)) {
                        return entry.getValue();
                    }
                }
            }
        }
        return null;
    }

    public void registerDependency(Class<?> key, Object value) {
        if (Service.class.isAssignableFrom(key)) {
            serviceMap.put((Class<? extends Service>) key, (Service) value);
        }
        otherInjectables.put(key, value);
    }

    /**
     * Get a Dynamic service implementation
     */
    public <T extends Service> T getService(Class<T> service) {
        return service.cast(loadService(service));
    }

    /**
     * Bulk initialize services
     *
     * @param targets Services
     */
    @SafeVarargs
    public final void loadServices(Class<? extends Service>... targets) {
        for (Class<? extends Service> target : targets) {
            loadService(target);
        }
    }

    /**
     * Returns true if the service is loaded
     * @param s Service
     * @return State
     */
    public boolean isServiceEnabled(Class<? extends Service> s) {
        return serviceMap.containsKey(s);
    }

}
