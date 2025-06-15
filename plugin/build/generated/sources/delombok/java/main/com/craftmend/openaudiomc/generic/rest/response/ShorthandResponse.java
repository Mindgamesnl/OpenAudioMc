package com.craftmend.openaudiomc.generic.rest.response;

public class ShorthandResponse<T> {
    private T response;
    private SectionError error = SectionError.NONE;

    public boolean hasError() {
        return error != SectionError.NONE;
    }

    public T getResponse() {
        return response;
    }

    public SectionError getError() {
        return error;
    }

    public ShorthandResponse(final T response, final SectionError error) {
        this.response = response;
        this.error = error;
    }
}
