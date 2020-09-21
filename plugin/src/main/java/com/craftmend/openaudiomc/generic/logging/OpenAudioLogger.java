package com.craftmend.openaudiomc.generic.logging;

public class OpenAudioLogger {

    private static final String LOG_PREFIX = "[OpenAudioMc] ";

    public static void toConsole(String message) {
        System.out.println(LOG_PREFIX + message);
    }

}
