package com.craftmend.openaudiomc.generic.authentication.objects;

import lombok.Getter;

@Getter
public class Key {

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
