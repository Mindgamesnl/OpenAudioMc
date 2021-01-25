package com.craftmend.openaudiomc.generic.networking.rest.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.rest.data.RestErrorResponse;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.internal.LinkedTreeMap;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {

    @Getter private List<RestErrorResponse> errors = new ArrayList<>();
    private LinkedTreeMap response;

    public <T extends AbstractRestResponse> T getResponse(Class<T> type) {
        Gson gson = OpenAudioMc.getGson();
        JsonObject jsonObject = gson.toJsonTree(response).getAsJsonObject();
        return gson.fromJson(gson.toJson(jsonObject), type);
    }
}
