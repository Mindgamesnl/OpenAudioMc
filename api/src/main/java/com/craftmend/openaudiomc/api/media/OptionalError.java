package com.craftmend.openaudiomc.api.media;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OptionalError {

    private boolean error;
    private String message;

}
