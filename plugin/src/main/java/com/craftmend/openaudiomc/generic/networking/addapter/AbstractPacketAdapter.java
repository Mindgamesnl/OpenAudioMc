package com.craftmend.openaudiomc.generic.networking.addapter;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.interfaces.ExternalModule;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.modules.ModuleLoaderService;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.google.gson.*;
import java.lang.reflect.Type;

public class AbstractPacketAdapter implements JsonSerializer<AbstractPacketPayload>, JsonDeserializer<AbstractPacketPayload> {

    /**
     * a type adapter for the using of the packet framework
     */

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
            OpenAudioLogger.handleException(cnfe);
            throw new JsonParseException("Unknown element type: " + type, cnfe);
        }
    }

    private Class loadClassModuleFallback(String classname) throws ClassNotFoundException {
        try {
            return Class.forName(classname);
        } catch (ClassNotFoundException e) {
            for (ExternalModule module : OpenAudioMc.getService(ModuleLoaderService.class).getModules()) {
                try {
                    return Class.forName(classname, true, module.getLoader());
                } catch (ClassNotFoundException ignored) {

                }
            }
            throw e;
        }
    }
}