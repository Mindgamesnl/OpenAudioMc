package com.craftmend.openaudiomc.generic.rest;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.loggin.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.rest.adapters.RegistrationResponseAdapter;
import com.craftmend.openaudiomc.generic.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.rest.interfaces.GenericApiResponse;
import com.craftmend.openaudiomc.generic.rest.responses.RegistrationResponse;
import com.craftmend.openaudiomc.generic.state.states.IdleState;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.Setter;
import okhttp3.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

public class RestRequest {

    public static final OkHttpClient client = new OkHttpClient();
    private String endpoint;
    @Setter private String body = null;
    private Map<String, String> variables = new HashMap<>();
    private static final Gson GSON = new GsonBuilder()
            .registerTypeAdapter(RegistrationResponse.class, new RegistrationResponseAdapter())
            .create();

    public RestRequest(RestEndpoint endpoint) {
        this.endpoint = endpoint.getURL();
    }

    public RestRequest setQuery(String key, String value) {
        variables.put(key, value);
        return this;
    }

    public CompletableFuture<GenericApiResponse> execute() {
        CompletableFuture<GenericApiResponse> response = new CompletableFuture<>();
        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
            response.complete(executeSync());
        });
        return response;
    }

    public GenericApiResponse executeSync() {
        try {
            String url = getUrl();
            String output = readHttp(url);
            try {
                return GSON.fromJson(output, GenericApiResponse.class);
            } catch (Exception e) {
                OpenAudioLogger.toConsole("Failed to handle output: " + output);
            }
        } catch (Exception e) {
            OpenAudioMc.getInstance().getStateService().setState(new IdleState("Net exception"));
            e.printStackTrace();
        }
        return null;
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
        Request.Builder request = new Request.Builder()
                .url(url);

        if (this.body == null) {
            request = request.get();
        } else {
            RequestBody body = RequestBody.create(
                    MediaType.parse("application/json"), this.body);
            request = request.post(body);
        }

        Call call = client.newCall(request.build());
        Response response = call.execute();
        return response.body().string();
    }

}
