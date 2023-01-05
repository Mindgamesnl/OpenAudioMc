package com.craftmend.openaudiomc.generic.rest.response;

import lombok.Getter;

public enum SectionError {

    // generic exception
    NONE("Nothing went wrong (yet)"),

    // unrecoverable errors
    TIMEOUT("The transport layer failed to connect to the server"),
    SERVER_ERROR("The server returned a 500 error"),
    NOT_FOUND("The server returned a 404 error"),

    @Getter private String message;
    SectionError(String message) {
        this.message = message;
    }

}
