package com.craftmend.openaudiomc.generic.logging;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.rest.ServerEnvironment;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import lombok.Setter;

import java.util.logging.Level;

public class OpenAudioLogger {

    private static final String LOG_PREFIX = "[OpenAudioMc] ";

    @Setter private static Logger logger = new Logger() {

        @Override
        public void error(String s) {
            System.err.println(s);
        }

        @Override
        public void info(String s) {
            System.out.println(s);
        }
    };

    public static void toConsole(String message) {
        logger.info(LOG_PREFIX + message);
    }

    public static void handleException(Throwable throwable) {
        // don't do anything if this is prod, lol
        if (OpenAudioMc.SERVER_ENVIRONMENT == ServerEnvironment.PRODUCTION) return;

        // get caller
        StackTraceElement[] stacktrace = Thread.currentThread().getStackTrace();
        StackTraceElement e = stacktrace[3];

        String methodThatFuckedUp = e.getMethodName();

        logger.error("Encountered an exception in " + methodThatFuckedUp);
        throwable.printStackTrace();
    }

}
