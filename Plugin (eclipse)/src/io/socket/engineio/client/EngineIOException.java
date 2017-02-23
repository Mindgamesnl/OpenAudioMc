package io.socket.engineio.client;

public class EngineIOException extends Exception {

    public String transport;
    public Object code;

    public EngineIOException() {
        super();
    }

    public EngineIOException(String message) {
        super(message);
    }

    public EngineIOException(String message, Throwable cause) {
        super(message, cause);
    }

    public EngineIOException(Throwable cause) {
        super(cause);
    }
}
