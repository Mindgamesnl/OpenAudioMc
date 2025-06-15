package com.craftmend.openaudiomc.api.exceptions;

/**
 * Thrown when a given speaker is not valid for a certain operation
 * (when its null, or not placed/managed by the API initially)
 */
public class InvalidSpeakerException extends RuntimeException {
    public InvalidSpeakerException(String message) {
        super(message);
    }
}
