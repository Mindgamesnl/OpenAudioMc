package com.craftmend.openaudiomc.generic.voicechat.api.util;

import com.craftmend.openaudiomc.generic.networking.rest.data.ErrorCode;
import lombok.Getter;
import lombok.Setter;

import java.util.function.BiConsumer;
import java.util.function.Consumer;

@Getter
public class Task<T> {

    @Setter private BiConsumer<ErrorCode, String> whenFails;
    @Setter private Consumer<T> whenSuccessful;

    public void success(T data) {
        if (whenSuccessful != null) whenSuccessful.accept(data);
    }

    public void fail(ErrorCode data) {
        if (whenFails != null) whenFails.accept(data, "No message provided");
    }
    public void fail(ErrorCode data, String message) {
        if (whenFails != null) whenFails.accept(data, message);
    }

}
