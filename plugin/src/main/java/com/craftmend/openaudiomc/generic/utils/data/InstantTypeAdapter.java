package com.craftmend.openaudiomc.generic.utils.data;

import com.google.gson.*;

import java.lang.reflect.Type;
import java.time.Instant;

/**
 * Warning!
 * This is a very, very, very shit work around for a problem which is even worse.
 *
 * Java 16 encapsulates some internal API's in modules, which prevents them from being accessed trough reflection.
 * One of these are Instants, which is fine, no one could ever try to load instants through reflection right?
 * No, it couldn't possibly happen!
 *
 * Not to worry though, at least gson is still maintained by google and is actively being fixed
 * well, no, sike again!
 * https://github.com/google/gson/issues/1875
 *
 * So, until I find the time to migrate everything to Moshi (which seems to be the widely accepted successor to Gson)
 * we'll need to utilize this ugly work around which manually serializes Instant instances (hehe good joke)
 */

public class InstantTypeAdapter implements JsonSerializer<Instant>, JsonDeserializer<Instant> {

    /**
     * The default json object that java (pre 16) used to generate for instants was
     * {
     *      "seconds": 1622404129,
     *      "nanos": 649388000
     * }
     *
     * so what this code does is parse that format, then create a fake temporal unit with those values and insert that
     * into an instant, that's because instants dont have a public constructor and i no longer trust reflection
     * because of the module fuckery
     */
    @Override
    public Instant deserialize(JsonElement jsonElement, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
        JsonObject jsonObject = jsonElement.getAsJsonObject();
        return Instant.from(new TemporalFaker(jsonObject.get("seconds").getAsLong(), jsonObject.get("nanos").getAsInt()));
    }

    /**
     * Short but simple, mock the format from the deserialize method to stay true to the spec
     */
    @Override
    public JsonElement serialize(Instant instant, Type type, JsonSerializationContext jsonSerializationContext) {
        JsonObject result = new JsonObject();
        result.add("seconds", new JsonPrimitive(instant.getEpochSecond()));
        result.add("nanos", new JsonPrimitive(instant.getNano()));
        return result;
    }

}
