package com.craftmend.openaudiomc.generic.rest.response;

import lombok.AllArgsConstructor;

@AllArgsConstructor
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

}
