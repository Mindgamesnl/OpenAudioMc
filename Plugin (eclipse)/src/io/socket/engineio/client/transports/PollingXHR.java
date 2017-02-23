package io.socket.engineio.client.transports;


import io.socket.emitter.Emitter;
import io.socket.engineio.client.Transport;
import io.socket.thread.EventThread;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.Proxy;
import java.net.URL;
import java.nio.ByteBuffer;
import java.util.*;
import java.util.logging.Logger;

public class PollingXHR extends Polling {

    private static final Logger logger = Logger.getLogger(PollingXHR.class.getName());

    public PollingXHR(Transport.Options opts) {
        super(opts);
    }

    protected Request request() {
        return this.request(null);
    }

    protected Request request(Request.Options opts) {
        if (opts == null) {
            opts = new Request.Options();
        }
        opts.uri = this.uri();
        opts.sslContext = this.sslContext;
        opts.hostnameVerifier = this.hostnameVerifier;
        opts.proxy = this.proxy;

        Request req = new Request(opts);

        final PollingXHR self = this;
        req.on(Request.EVENT_REQUEST_HEADERS, new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                // Never execute asynchronously for support to modify headers.
                self.emit(Transport.EVENT_REQUEST_HEADERS, args[0]);
            }
        }).on(Request.EVENT_RESPONSE_HEADERS, new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                EventThread.exec(new Runnable() {
                    @Override
                    public void run() {
                        self.emit(Transport.EVENT_RESPONSE_HEADERS, args[0]);
                    }
                });
            }
        });
        return req;
    }

    @Override
    protected void doWrite(byte[] data, final Runnable fn) {
        Request.Options opts = new Request.Options();
        opts.method = "POST";
        opts.data = data;
        Request req = this.request(opts);
        final PollingXHR self = this;
        req.on(Request.EVENT_SUCCESS, new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                EventThread.exec(new Runnable() {
                    @Override
                    public void run() {
                        fn.run();
                    }
                });
            }
        });
        req.on(Request.EVENT_ERROR, new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                EventThread.exec(new Runnable() {
                    @Override
                    public void run() {
                        Exception err = args.length > 0 && args[0] instanceof Exception ? (Exception)args[0] : null;
                        self.onError("xhr post error", err);
                    }
                });
            }
        });
        req.create();
    }

    @Override
    protected void doPoll() {
        logger.fine("xhr poll");
        Request req = this.request();
        final PollingXHR self = this;
        req.on(Request.EVENT_DATA, new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                EventThread.exec(new Runnable() {
                    @Override
                    public void run() {
                        Object arg = args.length > 0 ? args[0] : null;
                        if (arg instanceof String) {
                            self.onData((String)arg);
                        } else if (arg instanceof byte[]) {
                            self.onData((byte[])arg);
                        }
                    }
                });
            }
        });
        req.on(Request.EVENT_ERROR, new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                EventThread.exec(new Runnable() {
                    @Override
                    public void run() {
                        Exception err = args.length > 0 && args[0] instanceof Exception ? (Exception) args[0] : null;
                        self.onError("xhr poll error", err);
                    }
                });
            }
        });
        req.create();
    }

    public static class Request extends Emitter {

        public static final String EVENT_SUCCESS = "success";
        public static final String EVENT_DATA = "data";
        public static final String EVENT_ERROR = "error";
        public static final String EVENT_REQUEST_HEADERS = "requestHeaders";
        public static final String EVENT_RESPONSE_HEADERS = "responseHeaders";

        private String method;
        private String uri;

        // data is always a binary
        private byte[] data;

        private SSLContext sslContext;
        private HttpURLConnection xhr;
        private HostnameVerifier hostnameVerifier;
        private Proxy proxy;

        public Request(Options opts) {
            this.method = opts.method != null ? opts.method : "GET";
            this.uri = opts.uri;
            this.data = opts.data;
            this.sslContext = opts.sslContext;
            this.hostnameVerifier = opts.hostnameVerifier;
            this.proxy = opts.proxy;
        }

        public void create() {
            final Request self = this;
            try {
                logger.fine(String.format("xhr open %s: %s", this.method, this.uri));
                URL url = new URL(this.uri);
                xhr = proxy != null ? (HttpURLConnection) url.openConnection(proxy)
                        : (HttpURLConnection) url.openConnection();
                xhr.setRequestMethod(this.method);
            } catch (IOException e) {
                this.onError(e);
                return;
            }

            xhr.setConnectTimeout(10000);

            if (xhr instanceof HttpsURLConnection) {
                if (this.sslContext != null) {
                    ((HttpsURLConnection)xhr).setSSLSocketFactory(this.sslContext.getSocketFactory());
                }
                if (this.hostnameVerifier != null) {
                    ((HttpsURLConnection)xhr).setHostnameVerifier(this.hostnameVerifier);
                }
            }

            Map<String, List<String>> headers = new TreeMap<String, List<String>>(String.CASE_INSENSITIVE_ORDER);

            if ("POST".equals(this.method)) {
                xhr.setDoOutput(true);
                headers.put("Content-type", new LinkedList<String>(Arrays.asList("application/octet-stream")));
            }

            self.onRequestHeaders(headers);
            for (Map.Entry<String, List<String>> header : headers.entrySet()) {
                for (String v : header.getValue()){
                    xhr.addRequestProperty(header.getKey(), v);
                }
            }

            logger.fine(String.format("sending xhr with url %s | data %s", this.uri, this.data));
            new Thread(new Runnable() {
                @Override
                public void run() {
                    OutputStream output = null;
                    try {
                        if (self.data != null) {
                            xhr.setFixedLengthStreamingMode(self.data.length);
                            output = new BufferedOutputStream(xhr.getOutputStream());
                            output.write(self.data);
                            output.flush();
                        }

                        Map<String, List<String>> headers = xhr.getHeaderFields();
                        self.onResponseHeaders(headers);

                        final int statusCode = xhr.getResponseCode();
                        if (HttpURLConnection.HTTP_OK == statusCode) {
                            self.onLoad();
                        } else {
                            self.onError(new IOException(Integer.toString(statusCode)));
                        }
                    } catch (IOException e) {
                        self.onError(e);
                    } catch (NullPointerException e) {
                        // It would occur to disconnect
                        // https://code.google.com/p/android/issues/detail?id=76592
                        self.onError(e);
                    } finally {
                        try {
                            if (output != null) output.close();
                        } catch (IOException e) {}
                    }
                }
            }).start();
        }

        private void onSuccess() {
            this.emit(EVENT_SUCCESS);
        }

        private void onData(String data) {
            this.emit(EVENT_DATA, data);
            this.onSuccess();
        }

        private void onData(byte[] data) {
            this.emit(EVENT_DATA, data);
            this.onSuccess();
        }

        private void onError(Exception err) {
            this.emit(EVENT_ERROR, err);
        }

        private void onRequestHeaders(Map<String, List<String>> headers) {
            this.emit(EVENT_REQUEST_HEADERS, headers);
        }

        private void onResponseHeaders(Map<String, List<String>> headers) {
            this.emit(EVENT_RESPONSE_HEADERS, headers);
        }

        private void cleanup() {
            if (xhr == null) {
                return;
            }

            xhr.disconnect();
            xhr = null;
        }

        private void onLoad() {
            InputStream input = null;
            BufferedReader reader = null;
            String contentType = xhr.getContentType();
            try {
                if ("application/octet-stream".equalsIgnoreCase(contentType)) {
                    input = new BufferedInputStream(this.xhr.getInputStream());
                    List<byte[]> buffers = new ArrayList<byte[]>();
                    int capacity = 0;
                    int len = 0;
                    byte[] buffer = new byte[1024];
                    while ((len = input.read(buffer)) > 0) {
                        byte[] tempBuffer = new byte[len];
                        System.arraycopy(buffer, 0, tempBuffer, 0, len);
                        buffers.add(tempBuffer);
                        capacity += len;
                    }
                    ByteBuffer data = ByteBuffer.allocate(capacity);
                    for (byte[] b : buffers) {
                        data.put(b);
                    }
                    this.onData(data.array());
                } else {
                    String line;
                    StringBuilder data = new StringBuilder();
                    reader = new BufferedReader(new InputStreamReader(xhr.getInputStream()));
                    while ((line = reader.readLine()) != null) {
                        data.append(line);
                    }
                    this.onData(data.toString());
                }
            } catch (IOException e) {
                this.onError(e);
            } finally {
                try {
                    if (input != null) input.close();
                } catch (IOException e) {}
                try {
                    if (reader != null) reader.close();
                } catch (IOException e) {}
                this.cleanup();
            }
        }

        public static class Options {

            public String uri;
            public String method;
            public byte[] data;
            public SSLContext sslContext;
            public HostnameVerifier hostnameVerifier;
            public Proxy proxy;
        }
    }
}
