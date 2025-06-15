package com.craftmend.openaudiomc.api.media;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
/**
 * Represents an optional error
 */
public class OptionalError {

    private boolean error;
    private String message;

}
