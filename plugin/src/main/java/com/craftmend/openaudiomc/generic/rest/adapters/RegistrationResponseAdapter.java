package com.craftmend.openaudiomc.generic.networking.rest.adapters;

import com.craftmend.openaudiomc.generic.networking.rest.data.RestSuccessResponse;
import com.craftmend.openaudiomc.generic.networking.rest.responses.RegistrationResponse;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.google.gson.*;

import java.lang.reflect.Type;

public class RegistrationResponseAdapter implements JsonSerializer<RegistrationResponse>, JsonDeserializer<RegistrationResponse> {

    /**
     * a type adapter for the using of the packet framework
     */

    @Override
    public JsonElement serialize(RegistrationResponse src, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject result = new JsonObject();

        return result;
    }

    @Override
    public RegistrationResponse deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        JsonObject jsonObject = json.getAsJsonObject();

        return context.deserialize(jsonObject, RegistrationResponse.class);
    }
}
