package com.craftmend.openaudiomc.api.media;

/**
 * Represents an optional error
 */
public class OptionalError {
    private boolean error;
    private String message;

    public boolean isError() {
        return this.error;
    }

    public String getMessage() {
        return this.message;
    }

    public OptionalError(final boolean error, final String message) {
        this.error = error;
        this.message = message;
    }
}
