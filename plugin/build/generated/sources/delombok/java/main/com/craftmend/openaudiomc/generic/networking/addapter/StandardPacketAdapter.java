package com.craftmend.openaudiomc.generic.networking.addapter;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.google.gson.*;

import java.lang.reflect.Type;

public class StandardPacketAdapter implements JsonSerializer<StandardPacket>, JsonDeserializer<StandardPacket> {

    /**
     * a type adapter for the using of the packet framework
     */

    @Override
    public JsonElement serialize(StandardPacket src, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject result = new JsonObject();

        result.add("type", new JsonPrimitive(src.getClass().getName()));
        result.add("payload", context.serialize(src, src.getClass()));

        return result;
    }

    @Override
    public StandardPacket deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
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
            OpenAudioLogger.error(cnfe, "Failed to deserialize packet " + json.getAsString());
            throw new JsonParseException("Unknown element type: " + type, cnfe);
        }
    }
}