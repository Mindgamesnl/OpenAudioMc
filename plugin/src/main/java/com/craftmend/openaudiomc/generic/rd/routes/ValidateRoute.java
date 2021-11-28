package com.craftmend.openaudiomc.generic.rd.routes;

import com.craftmend.openaudiomc.generic.rd.http.HttpResponse;
import com.craftmend.openaudiomc.generic.rd.http.Route;
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
