package com.craftmend.openaudiomc.generic.cdn.http;

import fi.iki.elonen.NanoHTTPD;

import java.io.InputStream;

public class ExposedResponse extends NanoHTTPD.Response {
    public ExposedResponse(IStatus status, String mimeType, InputStream data, long totalBytes) {
        super(status, mimeType, data, totalBytes);
    }
}
