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

        JsonElement typeElement = jsonObject.get("type");
        JsonElement senderElement = jsonObject.get("senderUuid");
        JsonElement payloadElement = jsonObject.get("payload");

        if (typeElement == null || senderElement == null || payloadElement == null) {
            return new OARedisPacket() {
                @Override
                public String serialize() {
                    return "{}";
                }

                @Override
                public void handle(OARedisPacket received) {

                }
            };
        }

        String type = typeElement.getAsString();
        String senderUuid = senderElement.getAsString();

        try {
            OARedisPacket orp = context.deserialize(payloadElement, Class.forName(type));
            orp.setSenderUUID(UUID.fromString(senderUuid));
            return orp;
        } catch (ClassNotFoundException cnfe) {
            OpenAudioLogger.warn("Failed to adapt packet type " + type);
            throw new JsonParseException("Unknown element type: " + type, cnfe);
        }
    }
}
