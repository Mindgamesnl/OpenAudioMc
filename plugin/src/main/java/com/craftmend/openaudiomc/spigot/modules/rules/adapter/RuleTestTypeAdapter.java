package com.craftmend.openaudiomc.spigot.modules.rules.adapter;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.spigot.modules.rules.MediaRuleService;
import com.craftmend.openaudiomc.spigot.modules.rules.data.RuleTest;
import com.google.gson.*;

import java.lang.reflect.Type;

public class RuleTestTypeAdapter implements JsonSerializer<RuleTest>, JsonDeserializer<RuleTest> {

    @Override
    public JsonElement serialize(RuleTest src, Type typeOfSrc, JsonSerializationContext context) {
        JsonObject result = new JsonObject();
        result.add("ruleTestId", new JsonPrimitive(src.getId()));
        result.add("ruleId", new JsonPrimitive(src.getParentRuleId()));
        return result;
    }

    @Override
    public RuleTest deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        JsonObject jsonObject = json.getAsJsonObject();
        return OpenAudioMc.getService(MediaRuleService.class).getRuleById(jsonObject.get("ruleId").getAsString())
                .getTestById(jsonObject.get("ruleTestId").getAsString());
    }
}
