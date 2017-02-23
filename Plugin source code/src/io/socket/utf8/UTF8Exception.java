package io.socket.utf8;

import java.io.IOException;

public class UTF8Exception extends IOException {

    public UTF8Exception() {
        super();
    }

    public UTF8Exception(String message) {
        super(message);
    }

    public UTF8Exception(String message, Throwable cause) {
        super(message, cause);
    }

    public UTF8Exception(Throwable cause) {
        super(cause);
    }
}
