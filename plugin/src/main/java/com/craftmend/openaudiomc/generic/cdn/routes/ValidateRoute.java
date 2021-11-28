package com.craftmend.openaudiomc.generic.cdn.routes;

import com.craftmend.openaudiomc.generic.cdn.http.HttpResponse;
import com.craftmend.openaudiomc.generic.cdn.http.Route;
import fi.iki.elonen.NanoHTTPD;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ValidateRoute extends Route {

    private String code;

    @Override
    public HttpResponse onRequest(NanoHTTPD.IHTTPSession session) {
        return HttpResponse.text(code);
    }

}
