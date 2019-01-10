package com.craftmend.openaudiomc.services.authentication.objects;

import lombok.Getter;

import java.time.Instant;

@Getter
public class Key {

    private Instant created = Instant.now();
    private String value;

    public Key(String value) {
        this.value = value;
    }

}
