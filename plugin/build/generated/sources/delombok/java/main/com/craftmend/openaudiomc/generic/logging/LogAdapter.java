package com.craftmend.openaudiomc.generic.logging;

/**
 * The LogAdapter us a custom logging interface used by OpenAudioMc across its various platforms
 */
public interface LogAdapter {

    /**
     * Regular information logging
     * @param message the message to log
     */
    void info(String message);

    /**
     * Log a debug message, along with debug information about its caller (class, method, and line number)
     * @param message the message to log
     */
    void debug(String message);

    /**
     * Log an exception as cause, along with a human-readable message to provide some context
     * @param e the exception to log
     * @param message the message to log
     */
    void error(Throwable e, String message);

    /**
     * Log a warning message, similar to info, but with a different log level
     * @param message the message to log
     */
    void warn(String message);

    /**
     * Enable or disable debug logging
     * @param enable true to enable debug logging, false to disable
     */
    void enableDebug(boolean enable);

    /**
     * Check if debug logging is enabled
     * @return true if debug logging is enabled, false if not
     */
    boolean isDebugEnabled();

}
