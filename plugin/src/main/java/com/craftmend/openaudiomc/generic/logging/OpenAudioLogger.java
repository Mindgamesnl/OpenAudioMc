package com.craftmend.openaudiomc.generic.logging;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.rest.ServerEnvironment;
import lombok.Setter;

public class OpenAudioLogger {

    private static final String LOG_PREFIX = "[OpenAudioMc] ";
    private static boolean muted = false;

    @Setter private static Logger logger = new Logger() {

        @Override
        public void error(String s) {
            System.err.println(s);
        }

        @Override
        public void info(String s) {
            System.out.println(s);
        }

        @Override
        public boolean includePrefix() {
            return true;
        }
    };

    public static void toConsole(String message) {
        if (muted) return;
        logger.info((logger.includePrefix() ? LOG_PREFIX : "") + message);
    }

    public static void mute() {
        muted = true;
    }

    public static void unmute() {
        muted = false;
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
