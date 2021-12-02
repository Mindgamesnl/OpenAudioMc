package com.craftmend.openaudiomc.generic.rd.http;

import com.craftmend.openaudiomc.generic.rd.RestDirectService;
import com.craftmend.openaudiomc.generic.rd.routes.AudioFileRoute;
import com.craftmend.openaudiomc.generic.rd.routes.DefaultRoute;
import com.craftmend.openaudiomc.generic.rd.routes.StateRoute;
import com.craftmend.openaudiomc.generic.rd.routes.ValidateRoute;
import fi.iki.elonen.NanoHTTPD;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

public class RestDirectServer extends NanoHTTPD {

    private final Map<String, Route> routes = new HashMap<>();

    private final String verificationString;
    private final int port;

    public RestDirectServer(int port, String verificationString, RestDirectService restDirectService) throws IOException {
        super(port);
        this.port = port;
        this.verificationString = verificationString;
        start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);

        Logger.getLogger(NanoHTTPD.class.getName()).setLevel(Level.OFF);

        // register routes
        routes.put("/api/validate", new ValidateRoute(verificationString));
        routes.put("/api/audio", new AudioFileRoute(restDirectService));
        routes.put("/api/state", new StateRoute(restDirectService));
    }

    @Override
    public Response serve(IHTTPSession session) {
        Route route = routes.getOrDefault(session.getUri(), new DefaultRoute());
        HttpResponse whatNow = route.onRequest(session);

        if (whatNow.getResponse() == HttpResponseType.REDIRECT) {
            // redirect
            return newFixedLengthResponse(Response.Status.REDIRECT, "application/*", whatNow.getBody());
        } else if (whatNow.getResponse() == HttpResponseType.FILE) {
            return whatNow.getRaw();
        } else if (whatNow.getResponse() == HttpResponseType.JSON) {
            return newFixedLengthResponse(whatNow.getStatusCode(), "application/json", whatNow.getBody());
        }

        return newFixedLengthResponse(whatNow.getStatusCode(), "text/plain;charset=UTF-8", whatNow.getBody());
    }

}
