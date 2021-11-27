package com.craftmend.openaudiomc.generic.networking.rest;

import com.craftmend.openaudiomc.generic.networking.rest.data.ErrorCode;
import lombok.Getter;
import lombok.Setter;

import java.util.function.BiConsumer;
import java.util.function.Consumer;

@Getter
public class Task<T> {

    @Setter private BiConsumer<ErrorCode, String> whenFailed;
    @Setter private Consumer<T> whenFinished;
    private boolean finished = false;

    public void finish(T data) {
        if (finished) return;
        if (whenFinished != null) whenFinished.accept(data);
        finished = true;
    }

    public void fail(ErrorCode data) {
        if (finished) return;
        if (whenFailed != null) whenFailed.accept(data, "No message provided");
        finished = true;
    }

    public void fail(ErrorCode data, String message) {
        if (finished) return;
        if (whenFailed != null) whenFailed.accept(data, message);
        finished = true;
    }

}
