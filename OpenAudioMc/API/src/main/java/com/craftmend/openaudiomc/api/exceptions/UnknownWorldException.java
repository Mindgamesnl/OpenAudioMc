package com.craftmend.openaudiomc.api.exceptions;

/**
 * An exception representing a fatal error during world lookup
 */
public class UnknownWorldException extends Exception {

    public UnknownWorldException(String worldName) {
        super("There is no world with the name '" + worldName + "' loaded. Please ensure that it's typed correctly and that it's loaded.");
    }

    public UnknownWorldException() {
        super("The given world (with an unknown id) could not be found.");
    }

}
