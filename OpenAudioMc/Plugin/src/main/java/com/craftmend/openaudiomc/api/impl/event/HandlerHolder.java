package com.craftmend.openaudiomc.api.impl.event;

import lombok.Getter;
import lombok.Setter;

@Deprecated
public class HandlerHolder<T> {

    public HandlerHolder(T type) {
        this.type = type;
    }

    @Getter @Setter
    private Handler<T> handler;
    @Getter private T type;

    void call(Object caller) {
        handler.onEvent((T) caller);
    }

}
