package com.craftmend.openaudiomc.vistas.client.redis.handlers;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.function.Consumer;

@Getter
@Setter
@NoArgsConstructor
public class RedisPacketEvent<T extends AbstractPacketPayload> {

    private Consumer<T> handler;

    public void call(AbstractPacketPayload t) {
        handler.accept((T) t);
    }

}
