package com.craftmend.openaudiomc.generic.utils;

import okhttp3.Dispatcher;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

public final class NamedExecutors {

    public static Dispatcher namedDispatcher(String baseName) {
        AtomicInteger counter = new AtomicInteger(1);

        ThreadFactory factory = r -> {
            Thread t = new Thread(r);
            t.setName(baseName + "-" + counter.getAndIncrement());
            t.setDaemon(true);
            return t;
        };

        ExecutorService executor = Executors.newCachedThreadPool(factory);
        return new Dispatcher(executor);
    }
}

