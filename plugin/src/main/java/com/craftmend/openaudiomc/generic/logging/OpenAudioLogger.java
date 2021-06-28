package com.craftmend.openaudiomc.generic.logging;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.rest.ServerEnvironment;

public class OpenAudioLogger {

    private static final String LOG_PREFIX = "[OpenAudioMc] ";

    public static void toConsole(String message) {
        System.out.println(LOG_PREFIX + message);
    }

    public static void handleException(Throwable throwable) {
        // don't do anything if this is prod, lol
        if (OpenAudioMc.SERVER_ENVIRONMENT == ServerEnvironment.PRODUCTION) return;

        // get caller
        StackTraceElement[] stacktrace = Thread.currentThread().getStackTrace();
        StackTraceElement e = stacktrace[3];

        String methodThatFuckedUp = e.getMethodName();

        toConsole("Encountered an exception in " + methodThatFuckedUp);
        throwable.printStackTrace();
    }

}
