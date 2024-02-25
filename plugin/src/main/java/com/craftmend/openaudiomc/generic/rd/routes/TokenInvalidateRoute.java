package com.craftmend.openaudiomc.generic.rd.routes;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.client.helpers.TokenFactory;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.rd.RestDirectService;
import com.craftmend.openaudiomc.generic.rd.http.HttpResponse;
import com.craftmend.openaudiomc.generic.rd.http.Route;
import com.craftmend.openaudiomc.generic.utils.data.UuidUtils;
import fi.iki.elonen.NanoHTTPD;
import lombok.AllArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
public class TokenInvalidateRoute extends Route {

    private RestDirectService restDirectService;

    @Override
    public HttpResponse onRequest(NanoHTTPD.IHTTPSession session) {
        if (session.getParms() == null) {
            return HttpResponse.text("Bad request", NanoHTTPD.Response.Status.BAD_REQUEST);
        }
        String password = session.getParms().get("password");
        if (password == null || !password.equals(restDirectService.getPassword())) {
            return HttpResponse.text("Bad request", NanoHTTPD.Response.Status.BAD_REQUEST);
        }
        UUID clientUuid = UuidUtils.parseOrNull(session.getParms().getOrDefault("clientUuid", ""));
        if (clientUuid == null) {
            return HttpResponse.text("Bad request", NanoHTTPD.Response.Status.BAD_REQUEST);
        }
        ClientConnection cc = OpenAudioMc.getService(NetworkingService.class).getClient(clientUuid);
        if (cc == null) {
            return HttpResponse.text("Bad request", NanoHTTPD.Response.Status.BAD_REQUEST);
        }

        // ready save to do the thing
        OpenAudioLogger.info(cc.getUser().getName() + " activated a streamer mode reset");
        OpenAudioMc.getService(AuthenticationService.class).getDriver().removePlayerFromCache(clientUuid);
        cc.setAuth(new TokenFactory().build(cc));

        return HttpResponse.json(OpenAudioMc.getGson().toJson(cc.getAuth()));
    }

}
