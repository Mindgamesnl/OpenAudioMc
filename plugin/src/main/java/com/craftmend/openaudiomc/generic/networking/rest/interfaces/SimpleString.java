package com.craftmend.openaudiomc.generic.networking.rest.interfaces;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SimpleString extends AbstractRestResponse {
    private String value;
}
