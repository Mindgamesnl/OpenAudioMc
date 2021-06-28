package com.craftmend.openaudiomc.generic.redis.packets.adapter;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.google.gson.*;

import java.lang.reflect.Type;
import java.util.UUID;

public class RedisTypeAdapter implements JsonSerializer<OARedisPacket>, JsonDeserializer<OARedisPacket> {

    /**
     * a type adapter for the using of the packet framework
     */

    @Override
    public JsonElement serialize(OARedisPacket src, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject result = new JsonObject();

        result.add("type", new JsonPrimitive(src.getClass().getName()));
        result.add("payload", context.serialize(src, src.getClass()));
        result.add("senderUuid", new JsonPrimitive(src.getSenderUUID().toString()));

        return result;
    }

    @Override
    public OARedisPacket deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        JsonObject jsonObject = json.getAsJsonObject();
        String type = jsonObject.get("type").getAsString();
        String senderUuid = jsonObject.get("senderUuid").getAsString();
        JsonElement element = jsonObject.get("payload");

        try {
            OARedisPacket orp = context.deserialize(element, Class.forName(type));
            orp.setSenderUUID(UUID.fromString(senderUuid));
            return orp;
        } catch (ClassNotFoundException cnfe) {
            OpenAudioLogger.handleException(cnfe);
            throw new JsonParseException("Unknown element type: " + type, cnfe);
        }
    }
}
