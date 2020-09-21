package com.craftmend.openaudiomc.generic.utils;

import lombok.Getter;

import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

public class HeatMap<T> {

    private Map<T, Value> data = new HashMap<>();
    private int maxAgeInSeconds;
    private int maxElements;

    public HeatMap(int maxAgeInSeconds, int maxElements) {
        this.maxAgeInSeconds = maxAgeInSeconds;
        this.maxElements = maxElements;
    }

    public void bump(T value) {
        clean();

        Value incrementable = data.getOrDefault(value, new Value(value));
        incrementable.bump();
        data.put(value, incrementable);
    }

    public List<Value> getTop(int count) {
        int i = 0;
        List<Value> resultSet = new ArrayList<>();
        for (Value sortedValue : sortedValues()) {
            if (i >= count) return resultSet;
            resultSet.add(sortedValue);
            i++;
        }
        return resultSet;
    }

    private void clean() {
        int elements = 0;
        for (Value value : sortedValues()) {
            if (value.getAge() > maxAgeInSeconds) {
                data.remove(value.getValue());
                continue;
            }

            elements++;
            if (elements > maxElements) {
                data.remove(value.getValue());
            }
        }
    }

    private List<Value> sortedValues() {
        return data.values()
                .stream()
                .sorted(
                        Comparator
                                .comparingInt(Value::getAge)
                                .reversed()
                )
                .collect(Collectors.toList());
    }

    private class Value {
        @Getter private T value;
        @Getter private Instant pingedAt = Instant.now();
        @Getter private int score = 1;

        public Value(T value) {
            this.value = value;
        }

        public void bump() {
            score++;
            pingedAt = Instant.now();
        }

        public int getAge() {
            return (int) (Duration.between(pingedAt, Instant.now()).toMillis() / 1000);
        }
    }

}
