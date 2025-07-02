package com.craftmend.openaudiomc.api.exceptions;

/**
 * Thrown when a given location is not valid for a certain operation
 * (something is already there, or the location is not valid)
 */
public class InvalidLocationException extends RuntimeException {
    public InvalidLocationException(String message) {
        super(message);
    }
}
