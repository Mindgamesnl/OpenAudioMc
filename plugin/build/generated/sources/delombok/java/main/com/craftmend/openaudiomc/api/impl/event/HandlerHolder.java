package com.craftmend.openaudiomc.api.impl.event;

@Deprecated
public class HandlerHolder<T> {
    public HandlerHolder(T type) {
        this.type = type;
    }

    private Handler<T> handler;
    private T type;

    void call(Object caller) {
        handler.onEvent((T) caller);
    }

    public Handler<T> getHandler() {
        return this.handler;
    }

    public void setHandler(final Handler<T> handler) {
        this.handler = handler;
    }

    public T getType() {
        return this.type;
    }
}
