package com.craftmend.openaudiomc.generic.utils.data;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import com.craftmend.openaudiomc.generic.networking.addapter.AbstractPacketAdapter;
import com.craftmend.openaudiomc.generic.networking.addapter.StandardPacketAdapter;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import com.craftmend.openaudiomc.generic.redis.packets.adapter.RedisTypeAdapter;
import com.craftmend.openaudiomc.generic.redis.packets.interfaces.OARedisPacket;
import com.craftmend.openaudiomc.spigot.modules.show.adapter.RunnableTypeAdapter;
import com.craftmend.openaudiomc.spigot.modules.show.interfaces.ShowRunnable;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.time.Instant;

public class GsonFactory {

    public static Gson create() {
        return new GsonBuilder()
                .registerTypeAdapter(AbstractPacketPayload.class, new AbstractPacketAdapter())
                .registerTypeAdapter(StandardPacket.class, new StandardPacketAdapter())
                .registerTypeAdapter(ShowRunnable.class, new RunnableTypeAdapter())
                .registerTypeAdapter(OARedisPacket.class, new RedisTypeAdapter())
                .registerTypeAdapter(Instant.class, new InstantTypeAdapter())
                .create();
    }

}
