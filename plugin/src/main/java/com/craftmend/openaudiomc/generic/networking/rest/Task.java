package com.craftmend.openaudiomc.generic.networking.rest;

import com.craftmend.openaudiomc.generic.networking.rest.data.ErrorCode;
import lombok.Getter;
import lombok.Setter;
import lombok.SneakyThrows;

import java.time.Duration;
import java.time.Instant;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Predicate;

@Getter
public class Task<T> {

    @Setter private BiConsumer<ErrorCode, String> whenFailed;
    @Setter private Consumer<T> whenFinished;
    private T result;
    private String stringError = null;
    private boolean finished = false;

    public void finish(T data) {
        if (finished) return;
        if (whenFinished != null) whenFinished.accept(data);
        result = data;
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
        stringError = data.name() + ": " + message;
        finished = true;
    }

    public T waitUntil(int timeoutSeconds) {
        waitUntil((t) -> finished, timeoutSeconds);
        if (stringError != null) throw new IllegalStateException(stringError);
        return result;
    }

    @SneakyThrows
    private void waitUntil(Predicate<Void> test, int timeoutSeconds) {
        Instant start = Instant.now();
        while (!test.test(null)) {
            if (Duration.between(start, Instant.now()).getSeconds() > timeoutSeconds) {
                throw new IllegalStateException("Predicate took too long! Waiter over " + timeoutSeconds + " secondss.");
            }
            Thread.sleep(500);
        }
    }

}
