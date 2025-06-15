package com.craftmend.openaudiomc.spigot.modules.rules.adapter;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.craftmend.openaudiomc.spigot.modules.rules.MediaRuleService;
import com.craftmend.openaudiomc.spigot.modules.rules.data.Rule;
import com.google.gson.*;

import java.lang.reflect.Type;
import java.util.UUID;

public class RuleTypeAdapter implements JsonSerializer<Rule>, JsonDeserializer<Rule> {

    /**
     * a type adapter for the using of the packet framework
     */

    @Override
    public JsonElement serialize(Rule src, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject result = new JsonObject();
        result.add("ruleId", new JsonPrimitive(src.getId()));
        return result;
    }

    @Override
    public Rule deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        JsonObject jsonObject = json.getAsJsonObject();
        return OpenAudioMc.getService(MediaRuleService.class).getRuleById(jsonObject.get("ruleId").getAsString());
    }
}
