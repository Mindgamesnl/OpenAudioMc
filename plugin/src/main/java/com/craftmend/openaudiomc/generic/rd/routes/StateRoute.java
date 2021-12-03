package com.craftmend.openaudiomc.generic.rd.routes;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.client.helpers.SerializableClient;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.rd.RestDirectService;
import com.craftmend.openaudiomc.generic.rd.http.HttpResponse;
import com.craftmend.openaudiomc.generic.rd.http.Route;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.state.StateService;
import fi.iki.elonen.NanoHTTPD;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
public class StateRoute extends Route {

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

        Map<String, Object> r = new HashMap<>();

        r.put("version", OpenAudioMc.BUILD);

        // list services
        List<String> services = new ArrayList<>();
        for (Service allService : OpenAudioMc.getInstance().getServiceManager().allServices()) {
            services.add(allService.getClass().getName());
        }
        r.put("services", services);
        r.put("state", OpenAudioMc.getService(StateService.class).getCurrentState().asString());

        // list clients
        List<SerializableClient> clients = new ArrayList<>();
        for (ClientConnection c : OpenAudioMc.getService(NetworkingService.class).getClients()) {
            clients.add(c.getSession().asSerializableCopy());
        }
        r.put("services", services);
        r.put("clients", clients);
        r.put("state", OpenAudioMc.getService(StateService.class).getCurrentState().asString());

        return HttpResponse.json(OpenAudioMc.getGson().toJson(r));

    }

}
