package com.craftmend.openaudiomc.generic.logging.platform;

import com.craftmend.openaudiomc.generic.logging.LogAdapter;

import java.util.logging.Logger;

public class GenericLogAdapter implements LogAdapter {

    private final Logger genericLogger;
    private static final String ANSI_CYAN = "\u001B[36m";
    private static final String ANSI_RESET = "\u001B[0m";
    private static final String ANSI_RED = "\u001B[31m";
    private static final String ANSI_YELLOW = "\u001B[33m";
    private boolean enableDebug = false;

    public GenericLogAdapter(Logger genericLogger) {
        this.genericLogger = genericLogger;
    }

    @Override
    public void info(String message) {
        genericLogger.info("[info] " + message);
    }

    @Override
    public void debug(String message) {
        genericLogger.info("[debug] " + formatMessage(message, ANSI_CYAN));
    }

    @Override
    public void error(Throwable e, String message) {
        genericLogger.severe(ANSI_RED + "OpenAudioMc-Err: " + message + "\n" + e.toString() + ANSI_RESET);
        e.printStackTrace();
    }

    @Override
    public void warn(String message) {
        genericLogger.warning(ANSI_YELLOW + "WARNING: " + message + ANSI_RESET);
    }

    @Override
    public void enableDebug(boolean enable) {
        this.enableDebug = enable;
    }

    @Override
    public boolean isDebugEnabled() {
        return enableDebug;
    }

    private String formatMessage(String message, String colorCode) {
        return colorCode + message + ANSI_RESET;
    }
}

