package com.craftmend.openaudiomc.generic.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

public class HeatMap<T, S> {

    private final Map<T, Value> data = new HashMap<>();
    private final int maxAgeInSeconds;
    private final int maxElements;
    private final ContextFactory contextFactory;

    public HeatMap(int maxAgeInSeconds, int maxElements, ContextFactory contextFactory) {
        this.maxAgeInSeconds = maxAgeInSeconds;
        this.maxElements = maxElements;
        this.contextFactory = contextFactory;
    }

    public void bump(T value) {
        clean();

        Value incremental = data.getOrDefault(value, new Value(value, (S) contextFactory.buildContext()));
        incremental.bump();
        data.put(value, incremental);
    }

    public Collection<Value> getValues() {
        return data.values();
    }

    public Value get(T value) {
        return data.getOrDefault(value, new Value(value, (S) contextFactory.buildContext()));
    }

    public Map<T, Value> getMap() {
        return data;
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

    public void clean() {
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
                                .comparingInt(Value::getScore)
                                .reversed()
                )
                .collect(Collectors.toList());
    }

    public interface ContextFactory {
        Object buildContext();
    }

    public void forceValue(T value, Instant pingedAt, Integer score) {
        data.put(value, new Value(
                (S) contextFactory.buildContext(),
                value,
                pingedAt,
                score
        ));
    }

    @AllArgsConstructor
    public class Value {
        @Setter @Getter private S context;
        @Getter private final T value;
        @Getter private Instant pingedAt = Instant.now();
        @Getter private Integer score = 1;

        public Value(T value, S context) {
            this.value = value;
            this.context = context;
        }

        public Value setScore(Integer score) {
            this.score = score;
            pingedAt = Instant.now();
            data.put(value, this);
            return this;
        }

        public Value bump() {
            score++;
            pingedAt = Instant.now();
            data.put(value, this);
            return this;
        }

        public int getAge() {
            return (int) (Duration.between(pingedAt, Instant.now()).toMillis() / 1000);
        }
    }

    public static ContextFactory BYTE_CONTEXT = () -> (byte) 0;
}
