package com.craftmend.openaudiomc.generic.rest.response;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.internal.LinkedTreeMap;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Getter
public class IntermediateResponse<R extends AbstractRestResponse> {

    private LinkedTreeMap response = new LinkedTreeMap();
    private SectionError error = SectionError.NONE;

    @Deprecated // legacy endpoint errors
    private List<Map<String, String>> errors = new ArrayList<>();

    public static <T extends AbstractRestResponse> IntermediateResponse<T> fromJson(Class<T> typeClass, String body, boolean parseResponse) {
        if (!parseResponse) {
            IntermediateResponse<T> response = new IntermediateResponse<>();
            response.error = SectionError.NONE;
            return response;
        }

        UntypedResponse untypedResponse = OpenAudioMc.getGson().fromJson(body, UntypedResponse.class);

        // convert to typed response
        IntermediateResponse<T> intermediateResponse = new IntermediateResponse<>();
        intermediateResponse.response = untypedResponse.getResponse();
        intermediateResponse.error = untypedResponse.getError();

        intermediateResponse.errors = untypedResponse.getErrors();
        if (untypedResponse.getErrors().size() > 0) {
            intermediateResponse.error = SectionError.SERVER_ERROR; // unknown - not supporting legacy errors
        }

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

        @Deprecated // legacy endpoint errors
        private List<Map<String, String>> errors = new ArrayList<>();
    }

}
