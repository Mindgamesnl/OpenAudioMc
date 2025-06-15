package com.craftmend.openaudiomc.generic.networking.io;
import java.io.IOException;
import java.net.Proxy;
import java.net.ProxySelector;
import java.net.SocketAddress;
import java.net.URI;
import java.util.Collections;
import java.util.List;

/**
 * A proxy selector that always returns the {@link Proxy#NO_PROXY}.
 */
public class NullProxySelector extends ProxySelector {
    @Override
    public List<Proxy> select(URI uri) {
        if (uri == null) {
            throw new IllegalArgumentException("uri must not be null");
        }
        return Collections.singletonList(Proxy.NO_PROXY);
    }

    @Override
    public void connectFailed(URI uri, SocketAddress sa, IOException ioe) {
        ioe.printStackTrace();
    }
}