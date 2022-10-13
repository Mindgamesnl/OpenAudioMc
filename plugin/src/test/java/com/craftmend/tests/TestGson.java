package com.craftmend.tests;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.payloads.ClientDisconnectPayload;
import com.craftmend.openaudiomc.generic.utils.data.GsonFactory;
import com.google.gson.Gson;
import lombok.SneakyThrows;
import org.junit.Assert;
import org.junit.Test;

import java.time.Instant;
import java.util.UUID;

public class TestGson {

    @SneakyThrows
    @Test
    public void testGson() {
        Gson i = GsonFactory.create();


        UUID uuid = UUID.fromString("00000000-0000-0000-0000-000000000000");
        AbstractPacketPayload app = i.fromJson("{\"type\":\"ClientDisconnectPayload\",\"payload\":{\"client\":\"00000000-0000-0000-0000-000000000000\"}}", AbstractPacketPayload.class);
        Assert.assertTrue(app instanceof ClientDisconnectPayload);
        Assert.assertEquals(uuid, ((ClientDisconnectPayload) app).getClient());

        Instant instant = i.fromJson("{\n" +
                "        \"seconds\": 1622404129,\n" +
                "         \"nanos\": 649388000\n" +
                "      }", Instant.class);
        Assert.assertEquals(1622404129, instant.getEpochSecond());
        Assert.assertEquals(649388000, instant.getNano());
    }

}
