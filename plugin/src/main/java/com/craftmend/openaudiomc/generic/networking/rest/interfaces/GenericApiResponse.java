package com.craftmend.openaudiomc.generic.rest.interfaces;

import com.craftmend.openaudiomc.generic.rest.data.RestErrorResponse;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.internal.LinkedTreeMap;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public class GenericApiResponse {

    @Getter private List<RestErrorResponse> errors;
    private LinkedTreeMap response;

    public <T> T getResponse(Class<T> type) {
        Gson gson = new Gson();
        JsonObject jsonObject = gson.toJsonTree(response).getAsJsonObject();
        return gson.fromJson(gson.toJson(jsonObject), type);
    }
}
