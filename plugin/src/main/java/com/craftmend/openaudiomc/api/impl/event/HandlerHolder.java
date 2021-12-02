package com.craftmend.openaudiomc.api.impl.event;

import lombok.Getter;
import lombok.Setter;

public class HandlerHolder<T> {

    public HandlerHolder(T type) {
        this.type = type;
    }

    @Getter @Setter
    private Handler<T> handler;
    @Getter private final T type;

    void call(Object caller) {
        handler.onEvent((T) caller);
    }

}
