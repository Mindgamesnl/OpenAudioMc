package com.craftmend.openaudiomc.generic.utils.attempts;

import lombok.Setter;

import java.util.function.Consumer;

public class AttemptManager<T> {

    private final int maxAttempts;
    private int currentAttempt = 0;
    private int timeoutInSeconds;
    private AttemptTask<T> task;
    private boolean success = false;

    @Setter
    private Consumer<T> onSuccess;
    @Setter private Consumer<T> onFailure;

    public AttemptManager(int maxAttempts) {
        this.maxAttempts = maxAttempts;
    }

    public void attempt(AttemptTask<T> task) {
        this.task = task;
    }

    public void start() {
        nextAttempt();
    }

    private void nextAttempt() {
        currentAttempt++;
        if (currentAttempt > maxAttempts) {
            // fail, out of attempts
            onFailure.accept(null);
            return;
        }

        Attempt attempt = new Attempt<T>() {
            @Override
            public void onSuccess(T result) {
                if (isHandled()) return;

                success = true;
                onSuccess.accept(result);
                setHandled(true);
            }

            @Override
            public void onFail() {
                if (isHandled()) return;

                // try again
                nextAttempt();
                setHandled(true);
            }
        };

        task.run(attempt);
    }

}
