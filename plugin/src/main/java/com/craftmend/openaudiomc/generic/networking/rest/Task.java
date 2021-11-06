package com.craftmend.openaudiomc.generic.networking.rest;

import com.craftmend.openaudiomc.generic.networking.rest.data.ErrorCode;
import lombok.Getter;
import lombok.Setter;

import java.util.function.BiConsumer;
import java.util.function.Consumer;

@Getter
public class Task<T> {

    @Setter private BiConsumer<ErrorCode, String> whenFails;
    @Setter private Consumer<T> whenSuccessful;
    private boolean accepted = false;

    public void success(T data) {
        if (accepted) return;
        if (whenSuccessful != null) whenSuccessful.accept(data);
        accepted = true;
    }

    public void fail(ErrorCode data) {
        if (accepted) return;
        if (whenFails != null) whenFails.accept(data, "No message provided");
        accepted = true;
    }
    public void fail(ErrorCode data, String message) {
        if (accepted) return;
        if (whenFails != null) whenFails.accept(data, message);
        accepted = true;
    }

}
