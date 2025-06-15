package com.craftmend.openaudiomc.api.exceptions;

/**
 * An exception representing a fatal error during region lookup
 */
public class InvalidRegionException extends Exception {

    public InvalidRegionException(String message) {
        super(message);
    }

    public InvalidRegionException() {
        super("The given region (with an unknown id) could not be found.");
    }

}
