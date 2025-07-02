package com.craftmend.openaudiomc.generic.utils.data;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@NoArgsConstructor
public class TypeCounter<T> {

    @Getter private final Map<T,  Integer> values = new HashMap<>();

    public Integer getCount(T type) {
        return values.getOrDefault(type, 0);
    }

    public void bumpCounter(T type) {
        Integer currentState = getCount(type) + 1;
        values.put(type, currentState);
    }

    public T getHighest() {
        int score = -1;
        T value = null;

        for (Map.Entry<T, Integer> entry : values.entrySet()) {
            T type = entry.getKey();
            Integer v = entry.getValue();

            int count = getCount(type);
            if (count > score) {
                score = count;
                value = type;
            }
        }

        return value;
    }

}
