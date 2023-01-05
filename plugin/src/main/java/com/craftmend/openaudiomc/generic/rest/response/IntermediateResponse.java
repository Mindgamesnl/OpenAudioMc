package com.craftmend.openaudiomc.generic.rest.response;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.internal.LinkedTreeMap;
import lombok.Getter;

@Getter
public class IntermediateResponse<R extends AbstractRestResponse> {

    private LinkedTreeMap response = new LinkedTreeMap();
    private SectionError error = SectionError.NONE;

    public static <T extends AbstractRestResponse> IntermediateResponse<T> fromJson(Class<T> typeClass, String body) {
        UntypedResponse untypedResponse = OpenAudioMc.getGson().fromJson(body, UntypedResponse.class);

        // convert to typed response
        IntermediateResponse<T> intermediateResponse = new IntermediateResponse<>();
        intermediateResponse.response = untypedResponse.getResponse();
        intermediateResponse.error = untypedResponse.getError();
        return intermediateResponse;
    }

    public SectionError getError() {
        return error;
    }

    public boolean hasError() {
        return error != SectionError.NONE;
    }

    public R getResponse(Class<R> type) {
        Gson gson = OpenAudioMc.getGson();
        JsonObject jsonObject;
        try {
            jsonObject = gson.toJsonTree(response).getAsJsonObject();
        } catch (Exception e) {
            throw e;
        }
        return gson.fromJson(gson.toJson(jsonObject), type);
    }

    @Getter
    private static class UntypedResponse {
        private LinkedTreeMap response = new LinkedTreeMap();
        private SectionError error = SectionError.NONE;
    }

}
