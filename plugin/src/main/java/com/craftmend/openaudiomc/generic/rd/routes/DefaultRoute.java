package com.craftmend.openaudiomc.generic.rd.routes;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.rd.RestDirectService;
import com.craftmend.openaudiomc.generic.rd.http.HttpResponse;
import com.craftmend.openaudiomc.generic.rd.http.Route;
import com.craftmend.openaudiomc.generic.service.Service;
import fi.iki.elonen.NanoHTTPD;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DefaultRoute extends Route {

    @Override
    public HttpResponse onRequest(NanoHTTPD.IHTTPSession session) {
        Map<String, Object> r = new HashMap<>();

        r.put("version", OpenAudioMc.BUILD);
        List<String> services = new ArrayList<>();
        for (Service allService : OpenAudioMc.getInstance().getServiceManager().allServices()) {
            services.add(allService.getClass().getName());
        }
        r.put("services", services);

        List<String> files = new ArrayList<>();
        for (File file : OpenAudioMc.getService(RestDirectService.class).getAudioDirectory().listFiles()) {
            files.add(file.getName());
        }

        r.put("audioFiles", files);

        return HttpResponse.json(OpenAudioMc.getGson().toJson(r));
    }

}
