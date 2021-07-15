package com.craftmend.openaudiomc.generic.networking.addapter;

import com.craftmend.openaudiomc.api.impl.event.NetworkedAudioEvent;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.google.gson.*;

import java.lang.reflect.Type;

public class NetworkedAudioEventAdapter implements JsonSerializer<NetworkedAudioEvent>, JsonDeserializer<NetworkedAudioEvent> {

    /**
     * a type adapter for the using of the packet framework
     */

    @Override
    public JsonElement serialize(NetworkedAudioEvent src, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject result = new JsonObject();

        result.add("type", new JsonPrimitive(src.getClass().getName()));
        result.add("payload", context.serialize(src, src.getClass()));

        return result;
    }

    @Override
    public NetworkedAudioEvent deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        JsonObject jsonObject = json.getAsJsonObject();
        String type = null;
        JsonElement typeElement = jsonObject.get("type");
        if (typeElement != null) {
            type = typeElement.getAsString();
        }
        JsonElement element = jsonObject.get("payload");

        try {
            return context.deserialize(element, Class.forName(type));
        } catch (ClassNotFoundException cnfe) {
            OpenAudioLogger.handleException(cnfe);
            throw new JsonParseException("Unknown element type: " + type, cnfe);
        }
    }
}