package com.craftmend.openaudiomc.generic.logging.platform;

import com.craftmend.openaudiomc.generic.logging.LogAdapter;

/**
 * The default logging interface targeting standard output, with some predefined colors for different log levels
 */
public class StdOutLog implements LogAdapter {

    private boolean enableDebug = false;
    private static final String ANSI_RESET = "\u001B[0m";
    private static final String ANSI_RED = "\u001B[31m";
    private static final String ANSI_YELLOW = "\u001B[33m";
    private static final String ANSI_CYAN = "\u001B[36m";

    @Override
    public void info(String message) {
        System.out.println("[OpenAudioMc-Info] " + formatMessage(message, ANSI_RESET));
    }

    @Override
    public void debug(String message) {
        if (!enableDebug) return;
        System.out.println("[OpenAudioMc-Debug] " + formatMessage(message, ANSI_CYAN));
    }

    @Override
    public void error(Throwable e, String message) {
        System.err.println(ANSI_RED + "[OpenAudioMc-Err]: " + message + "\n" + e.toString() + ANSI_RESET);
        e.printStackTrace();
    }

    @Override
    public void warn(String message) {
        System.out.println("[OpenAudioMc-Warn] " + ANSI_YELLOW + message + ANSI_RESET);
    }

    @Override
    public void enableDebug(boolean enable) {
        this.enableDebug = enable;
    }

    @Override
    public boolean isDebugEnabled() {
        return enableDebug;
    }

    // Helper method to format the log message with color
    private String formatMessage(String message, String colorCode) {
        return colorCode + message + ANSI_RESET;
    }
}
