package com.craftmend.openaudiomc.generic.authentication.objects;

import lombok.Getter;

import java.time.Instant;

@Getter
public class Key {

    private Instant created = Instant.now();
    private String value;

    /**
     * A auth key holder
     *
     * @param value key
     */
    public Key(String value) {
        this.value = value;
    }

}
