package com.craftmend.openaudiomc.generic.networking.rest;

import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.generic.networking.addapter.GenericApiResponse;
import com.google.gson.Gson;

import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class RestRequest {

    private String endpoint;
    private Map<String, String> variables = new HashMap<>();

    public RestRequest(String endpoint) {
        this.endpoint = endpoint;
    }

    public RestRequest setQuery(String key, String value) {
        variables.put(key, value);
        return this;
    }

    public GenericApiResponse execute() throws IOException {
        return new Gson().fromJson(readHttp(getUrl()), GenericApiResponse.class);
    }

    private String getUrl() {
        String url = OpenAudioMcSpigot.getInstance().getConfigurationModule().getServer();
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
