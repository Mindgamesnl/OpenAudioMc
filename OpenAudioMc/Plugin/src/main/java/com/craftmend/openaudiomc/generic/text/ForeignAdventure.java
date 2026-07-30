package com.craftmend.openaudiomc.generic.text;

import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.serializer.gson.GsonComponentSerializer;

import java.lang.reflect.Method;

/**
 * Velocity ships its own Adventure under the same package names as the copy we shade, so a direct
 * reference would be rewritten by the shadow relocator and miss the proxy's classes at runtime.
 * Everything here therefore goes through reflection, with class names assembled at runtime so the
 * relocator cannot rewrite those either.
 */
public final class ForeignAdventure {

    private static final String COMPONENT = String.join(".", "net", "kyori", "adventure", "text", "Component");
    private static final String GSON_SERIALIZER = String.join(".", "net", "kyori", "adventure", "text", "serializer", "gson", "GsonComponentSerializer");

    private static Class<?> componentClass;
    private static Method componentText;
    private static Method deserialize;
    private static Object gsonSerializer;

    private ForeignAdventure() {
    }

    public static synchronized Class<?> componentClass() throws ClassNotFoundException {
        if (componentClass == null) {
            componentClass = Class.forName(COMPONENT);
        }
        return componentClass;
    }

    public static synchronized Object text(String text) throws Exception {
        if (componentText == null) {
            componentText = componentClass().getMethod("text", String.class);
        }
        return componentText.invoke(null, text);
    }

    public static synchronized Object convert(Component component) throws Exception {
        if (deserialize == null) {
            Class<?> serializer = Class.forName(GSON_SERIALIZER);
            gsonSerializer = serializer.getMethod("gson").invoke(null);
            deserialize = findDeserialize(serializer);
        }
        return deserialize.invoke(gsonSerializer, GsonComponentSerializer.gson().serialize(component));
    }

    /**
     * ComponentSerializer#deserialize is generic, so it erases to deserialize(Object) rather than the
     * deserialize(String) a by-signature lookup would ask for.
     */
    static Method findDeserialize(Class<?> serializer) throws NoSuchMethodException {
        for (Method method : serializer.getMethods()) {
            if (method.getName().equals("deserialize")
                    && method.getParameterCount() == 1
                    && method.getParameterTypes()[0].isAssignableFrom(String.class)) {
                return method;
            }
        }
        throw new NoSuchMethodException("No usable deserialize method on " + serializer.getName());
    }

}
