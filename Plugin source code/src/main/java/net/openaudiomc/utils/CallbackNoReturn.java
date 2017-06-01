package net.openaudiomc.utils;

public interface CallbackNoReturn<T> {
    interface CallbackTwo<T> {
        void execute(String string);
    }

    void execute(String string);
}
