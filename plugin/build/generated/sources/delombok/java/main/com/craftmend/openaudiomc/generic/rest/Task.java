package com.craftmend.openaudiomc.generic.rest;

import com.craftmend.openaudiomc.generic.rest.response.SectionError;
import lombok.Setter;
import java.time.Duration;
import java.time.Instant;
import java.util.function.Consumer;
import java.util.function.Predicate;

public class Task<T> {
    private Consumer<SectionError> whenFailed;
    private Consumer<T> whenFinished;
    private T result;
    private String stringError = null;
    private boolean finished = false;

    public void finish(T data) {
        if (finished) return;
        if (whenFinished != null) whenFinished.accept(data);
        result = data;
        finished = true;
    }

    public Task<T> setWhenFailed(Consumer<SectionError> whenFailed) {
        this.whenFailed = whenFailed;
        return this;
    }

    public Task<T> setWhenFinished(Consumer<T> whenFinished) {
        this.whenFinished = whenFinished;
        return this;
    }

    // more js like
    public Task<T> then(Consumer<T> whenFinished) {
        return setWhenFinished(whenFinished);
    }

    public Task<T> catchException(Consumer<SectionError> whenFailed) {
        return setWhenFailed(whenFailed);
    }

    public void fail(SectionError error) {
        if (finished) return;
        if (whenFailed != null) whenFailed.accept(error);
        finished = true;
    }

    public T waitUntil(int timeoutSeconds) {
        waitUntil(t -> finished, timeoutSeconds);
        if (stringError != null) throw new IllegalStateException(stringError);
        return result;
    }

    private void waitUntil(Predicate<Void> test, int timeoutSeconds) {
        try {
            Instant start = Instant.now();
            while (!test.test(null)) {
                if (Duration.between(start, Instant.now()).getSeconds() > timeoutSeconds) {
                    throw new IllegalStateException("Predicate took too long! Waiter over " + timeoutSeconds + " secondss.");
                }
                Thread.sleep(500);
            }
        } catch (final java.lang.Throwable $ex) {
            throw lombok.Lombok.sneakyThrow($ex);
        }
    }

    public Consumer<SectionError> getWhenFailed() {
        return this.whenFailed;
    }

    public Consumer<T> getWhenFinished() {
        return this.whenFinished;
    }

    public T getResult() {
        return this.result;
    }

    public String getStringError() {
        return this.stringError;
    }

    public boolean isFinished() {
        return this.finished;
    }
}
