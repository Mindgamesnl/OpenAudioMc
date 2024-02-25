package com.craftmend.openaudiomc.generic.networking.addapter;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.modules.ModuleLoaderService;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.google.gson.*;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class AbstractPacketAdapter implements JsonSerializer<AbstractPacketPayload>, JsonDeserializer<AbstractPacketPayload> {

    /**
     * a type adapter for the using of the packet framework
     */
    private boolean walkedClassLoader = false;

    // caching mechanism for failed packet lookups during vistas, where there are multiple class loaders
    private final Map<String, Class<?>> classMapCache = new HashMap<>();
    // we don't care too much about pointer safety, so we can just use a read write lock
    // because classes themselves are immutable
    private final ReadWriteLock lock = new ReentrantReadWriteLock();

    @Override
    public JsonElement serialize(AbstractPacketPayload src, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject result = new JsonObject();

        result.add("type", new JsonPrimitive(src.getClass().getName()));
        result.add("payload", context.serialize(src, src.getClass()));

        return result;
    }

    @Override
    public AbstractPacketPayload deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        JsonObject jsonObject = json.getAsJsonObject();
        String type = null;
        JsonElement typeElement = jsonObject.get("type");
        if (typeElement != null) {
            type = typeElement.getAsString();
        }
        JsonElement element = jsonObject.get("payload");

        try {
            if (type == null) {
                return new AbstractPacketPayload();
            }

            if (type.contains("openaudiomc")) {
                return context.deserialize(element, loadClassModuleFallback(type));
            }

            return context.deserialize(element, loadClassModuleFallback("com.craftmend.openaudiomc.generic.networking.payloads." + type));
        } catch (ClassNotFoundException cnfe) {
            OpenAudioLogger.error(cnfe, "Failed to deserialize packet type " + type);
            throw new JsonParseException("Unknown element type: " + type, cnfe);
        }
    }

    private Class<?> loadClassModuleFallback(String classname) throws ClassNotFoundException {

        // try to get the class from the cache
        lock.readLock().lock();
        Class<?> cachedClass = classMapCache.get(classname);
        lock.readLock().unlock();

        if (cachedClass != null) {
            return cachedClass;
        }

        // try to resolve the class
        Class<?> resolved = deepQueryClasses(classname);

        // cache the class
        lock.writeLock().lock();
        classMapCache.put(classname, resolved);
        lock.writeLock().unlock();

        return resolved;
    }

    private Class<?> deepQueryClasses(String classname) throws ClassNotFoundException {
        try {
            return Class.forName(classname);
        } catch (ClassNotFoundException e) {
            for (ExternalModule module : OpenAudioMc.getService(ModuleLoaderService.class).getModules()) {
                try {
                    if (!walkedClassLoader) {
                        OpenAudioLogger.info("Handling a packet type that isn't in the native class loader, searching modules for the first time instead.");
                        walkedClassLoader = true;
                    }
                    return Class.forName(classname, true, module.getLoader());
                } catch (ClassNotFoundException ignored) {

                }
            }
            throw e;
        }
    }
}