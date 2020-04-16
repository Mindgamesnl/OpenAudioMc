package com.craftmend.openaudiomc.generic.networking.rest;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.loggin.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.rest.adapters.RegistrationResponseAdapter;
import com.craftmend.openaudiomc.generic.networking.rest.data.RestSuccessResponse;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.GenericApiResponse;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import com.craftmend.openaudiomc.generic.networking.rest.responses.RegistrationResponse;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.concurrent.CompletableFuture;

public class RestRequest {

    private String endpoint;
    private Map<String, String> variables = new HashMap<>();
    private static final Gson GSON = new GsonBuilder()
            .registerTypeAdapter(RegistrationResponse.class, new RegistrationResponseAdapter())
            .create();

    public RestRequest(String endpoint) {
        this.endpoint = endpoint;
    }

    public RestRequest setQuery(String key, String value) {
        variables.put(key, value);
        return this;
    }

    public CompletableFuture<GenericApiResponse> execute() {
        CompletableFuture<GenericApiResponse> response = new CompletableFuture<>();
        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
            try {
                String url = getUrl();
                response.complete(GSON.fromJson(readHttp(url), GenericApiResponse.class));
            } catch (Exception e) {
                OpenAudioMc.getInstance().getStateService().setState(new IdleState("Exception while shaking hands"));
                e.printStackTrace();
            }
        });
        return response;
    }

    private String getUrl() {
        String url = "http://plus.openaudiomc.net";
        url += this.endpoint;
        if (variables.size() != 0) {
            url+= '?';
            for (Map.Entry<String, String> entry : variables.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();
                url = url + ("&" + key + "=" + value);
            }
        }
        return url;
    }

    private String readHttp(String url) throws IOException {
        try (Scanner scanner = new Scanner(new URL(url).openStream(),
                StandardCharsets.UTF_8.toString())) {
            scanner.useDelimiter("\\A");
            return scanner.hasNext() ? scanner.next() : "";
        }
    }

}
