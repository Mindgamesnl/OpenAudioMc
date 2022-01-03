package com.craftmend.utils;

import lombok.SneakyThrows;

import java.time.Duration;
import java.time.Instant;
import java.util.function.Predicate;

public class Waiter {

    @SneakyThrows
    public static void waitSeconds(int time) {
        Thread.sleep(time * 1000);
    }

    @SneakyThrows
    public static void waitUntil(Predicate<Void> test, int timeoutSeconds) {
        Instant start = Instant.now();
        while (!test.test(null)) {
            if (Duration.between(start, Instant.now()).getSeconds() > timeoutSeconds) {
                throw new IllegalStateException("Predicate took too long! Waiter over " + timeoutSeconds + " secondss.");
            }
           Thread.sleep(500);
        }
    }

}
