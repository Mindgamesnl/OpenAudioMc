package com.craftmend.openaudiomc.generic.utils.attempts;

public abstract class Attempt<T> {
    private boolean handled = false;

    public abstract void onSuccess(T result);

    public abstract void onFail();

    public boolean isHandled() {
        return this.handled;
    }

    public void setHandled(final boolean handled) {
        this.handled = handled;
    }
}
