package com.craftmend.openaudiomc.generic.utils;

import java.util.stream.Stream;

public abstract class Filter<T, V> {

    public abstract Stream<T> wrap(Stream<T> existingStream, V context);

}
