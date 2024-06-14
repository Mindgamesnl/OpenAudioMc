package com.craftmend.openaudiomc.api.exceptions;

/**
 * Throw when a method is called from an invalid thread
 */
public class InvalidThreadException extends Exception {

    public InvalidThreadException() {
        super("This method can only be called from the main thread");
    }

}
