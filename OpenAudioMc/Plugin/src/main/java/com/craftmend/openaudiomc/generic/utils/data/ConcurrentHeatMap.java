package com.craftmend.openaudiomc.generic.utils.data;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public class ConcurrentHeatMap<T, S> {

    public static final ContextFactory BYTE_CONTEXT = () -> (byte) 0;
    private final Map<T, Value> data = new ConcurrentHashMap<>();
    private final int maxAgeInSeconds;
    private final int maxElements;
    private final ContextFactory contextFactory;
    @Setter private Consumer<T> deleteConsumer = null;

    public ConcurrentHeatMap(int maxAgeInSeconds, int maxElements, ContextFactory contextFactory) {
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

    public int size() {
        return data.size();
    }

    public void delete(T key)  {
        data.remove(key);
    }

    public Collection<Value> getValues() {
        return data.values();
    }

    public Value get(T value) {
        return data.computeIfAbsent(value, k -> new Value(value, (S) contextFactory.buildContext()));
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
        List<T> removals = new ArrayList<>();
        for (Value value : sortedValues()) {
            if (value.getAge() > maxAgeInSeconds) {
                removals.add(value.getValue());
                continue;
            }

            elements++;
            if (elements > maxElements) {
                removals.add(value.getValue());
            }
        }

        for (T removal : removals) {
            data.remove(removal);
            if (deleteConsumer != null) {
                try {
                    deleteConsumer.accept(removal);
                } catch (Exception e) {
                    OpenAudioLogger.error(e , "Failed to delete " + removal + " from heat map");
                }
            }
        }
    }

    private List<Value> sortedValues() {
        if (data.isEmpty()) return new ArrayList<>();

        return new ArrayList<>(data.values())
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
}
