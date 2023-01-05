package com.craftmend.openaudiomc.generic.networking.rest.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.internal.LinkedTreeMap;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {

    private LinkedTreeMap response = new LinkedTreeMap();
    @Setter @Getter private int statusCode = -1;

    public static ApiResponse strictBody(String body, int statusCode) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.statusCode = statusCode;
        return apiResponse;
    }

    public static ApiResponse fromJson(int statusCode, String body) {
        ApiResponse apiResponse = null;
        try {
            apiResponse = OpenAudioMc.getGson().fromJson(body, ApiResponse.class);
        } catch (Exception e) {
            OpenAudioLogger.toConsole("Failed to parse response from server, using empty body instead");
            apiResponse = new ApiResponse();
        }
        apiResponse.statusCode = statusCode;
        return apiResponse;
    }

    public String responseAsString() {
        Gson gson = OpenAudioMc.getGson();
        return gson.toJson(this);
    }

    public <T extends AbstractRestResponse> T getResponse(Class<T> type) {
        Gson gson = OpenAudioMc.getGson();
        JsonObject jsonObject;
        try {
            jsonObject = gson.toJsonTree(response).getAsJsonObject();
        } catch (Exception e) {
            throw e;
        }
        return gson.fromJson(gson.toJson(jsonObject), type);
    }
}
