package com.craftmend.openaudiomc.generic.cdn.http;

import fi.iki.elonen.NanoHTTPD;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class HttpResponse {

    private HttpResponseType response;
    private String body;
    private NanoHTTPD.Response raw;
    private NanoHTTPD.Response.Status statusCode = NanoHTTPD.Response.Status.OK;

    public static HttpResponse redirect(String to) {
        return new HttpResponse(HttpResponseType.REDIRECT, to, null, NanoHTTPD.Response.Status.OK);
    }

    public static HttpResponse text(String content) {
        return new HttpResponse(HttpResponseType.TEXT, content, null, NanoHTTPD.Response.Status.OK);
    }

    public static HttpResponse text(String content, NanoHTTPD.Response.Status statusCode) {
        return new HttpResponse(HttpResponseType.TEXT, content, null, statusCode);
    }

    public static HttpResponse raw(NanoHTTPD.Response raw) {
        return new HttpResponse(HttpResponseType.FILE, "", raw, NanoHTTPD.Response.Status.OK);
    }

    public static HttpResponse json(String content) {
        return new HttpResponse(HttpResponseType.JSON, content, null, NanoHTTPD.Response.Status.OK);
    }

}
