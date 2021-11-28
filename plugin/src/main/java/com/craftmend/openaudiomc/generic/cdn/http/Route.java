package com.craftmend.openaudiomc.generic.cdn.http;

import fi.iki.elonen.NanoHTTPD;

public abstract class Route {

    public abstract HttpResponse onRequest(NanoHTTPD.IHTTPSession session);

}
