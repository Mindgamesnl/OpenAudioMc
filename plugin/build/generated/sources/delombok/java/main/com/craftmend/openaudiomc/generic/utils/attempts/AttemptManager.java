package com.craftmend.openaudiomc.generic.utils.attempts;

import java.util.function.Consumer;

public class AttemptManager<T> {
    private int maxAttempts;
    private int currentAttempt = 0;
    private int timeoutInSeconds;
    private AttemptTask<T> task;
    private boolean success = false;
    private Consumer<T> onSuccess;
    private Consumer<T> onFailure;

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

    public void setOnSuccess(final Consumer<T> onSuccess) {
        this.onSuccess = onSuccess;
    }

    public void setOnFailure(final Consumer<T> onFailure) {
        this.onFailure = onFailure;
    }
}
