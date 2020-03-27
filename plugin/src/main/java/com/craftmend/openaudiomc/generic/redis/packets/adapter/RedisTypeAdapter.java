package com.craftmend.openaudiomc.generic.redis.packets.adapter;

import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import com.google.gson.*;

import java.lang.reflect.Type;

public class RedisTypeAdapter implements JsonSerializer<OARedisPacket<?>>, JsonDeserializer<OARedisPacket<?>> {

    /**
     * a type adapter for the using of the packet framework
     */

    @Override
    public JsonElement serialize(OARedisPacket<?> src, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject result = new JsonObject();

        result.add("type", new JsonPrimitive(src.getClass().getName()));
        result.add("payload", context.serialize(src, src.getClass()));

        return result;
    }

    @Override
    public OARedisPacket<?> deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        JsonObject jsonObject = json.getAsJsonObject();
        String type = jsonObject.get("type").getAsString();
        JsonElement element = jsonObject.get("payload");

        try {
            return context.deserialize(element, Class.forName(type));
        } catch (ClassNotFoundException cnfe) {
            throw new JsonParseException("Unknown element type: " + type, cnfe);
        }
    }
}
