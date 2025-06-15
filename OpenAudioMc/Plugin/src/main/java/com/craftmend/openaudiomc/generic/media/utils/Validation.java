package com.craftmend.openaudiomc.generic.media.utils;

public class Validation {

    public static boolean isStringInvalid(String s) {
        if (s == null) return true;
        if (s.isEmpty()) return true;
        if (s.equalsIgnoreCase("set")) return true;
        return s.trim().isEmpty();
    }

}
