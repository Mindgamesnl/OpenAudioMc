package com.craftmend.openaudiomc.generic.networking.rest;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import lombok.Getter;
import lombok.Setter;
import okhttp3.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class RestRequest {

    public static OkHttpClient client = new OkHttpClient();
    @Getter private String endpoint;
    @Getter private String body = null;
    @Setter private boolean verbose = true;
    private final Map<String, String> variables = new HashMap<>();
    @Setter private int timeout = -1;

    public RestRequest(RestEndpoint endpoint) {
        this.endpoint = endpoint.getURL();
    }

    public RestRequest(RestEndpoint endpoint, String hostReplacement) {
        // clone
        this.endpoint = endpoint.getURL();
        if (this.endpoint.startsWith("/")) {
            this.endpoint = this.endpoint.replaceFirst("/", "");
        }

        if (!hostReplacement.endsWith("/")) {
            hostReplacement = hostReplacement + "/";
        }

        this.endpoint = hostReplacement + this.endpoint;
    }

    public RestRequest setQuery(String key, String value) {
        variables.put(key, value);
        return this;
    }

    public RestRequest setBody(Object object) {
        if (object instanceof String)
            throw new IllegalArgumentException("Objects will be serialized for you! Don't pass in raw strings.");
        this.body = OpenAudioMc.getGson().toJson(object);
        return this;
    }

    public CompletableFuture<ApiResponse> executeAsync() {
        CompletableFuture<ApiResponse> response = new CompletableFuture<>();
        OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> response.complete(executeInThread()));
        return response;
    }

    public ApiResponse executeInThread() {
        try {
            String url = getUrl();
            HttpRes output = readHttp(url);
            if (output.code != 500 && output.body.startsWith("{")) {
                return ApiResponse.fromJson(output.code, output.body);
            } else {
                return ApiResponse.strictBody(output.body, output.code);
            }
        } catch (Exception e) {
            if (this.verbose) {
                OpenAudioLogger.handleException(e);
                OpenAudioLogger.toConsole("Net error: " + e.getMessage());
                e.printStackTrace();
            }
            ApiResponse errorResponse = new ApiResponse();
            errorResponse.setStatusCode(408); // timeout
            return errorResponse;
        }
    }

    public String getUrl() {
        setQuery("oa-env", OpenAudioMc.SERVER_ENVIRONMENT.toString());
        setQuery("oa-plbuild", OpenAudioMc.BUILD.getBuildNumber() + "");

        StringBuilder url = new StringBuilder(this.endpoint);
        if (variables.size() != 0) {
            url.append('?');
            for (Map.Entry<String, String> entry : variables.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();
                url.append("&").append(key).append("=").append(value);
            }
        }
        return url.toString();
    }

    private HttpRes readHttp(String url) throws IOException {
        Request.Builder request = new Request
                .Builder()
                .url(url)
                .header("oa-env", OpenAudioMc.SERVER_ENVIRONMENT.toString());

        if (this.body == null) {
            request = request.get();
        } else {
            request = request.post(RequestBody.create(this.body, MediaType.parse("application/json")));
        }

        if (timeout == -1) {
            Call call = client.newCall(request.build());
            Response response = call.execute();
            return new HttpRes(response.code(), Objects.requireNonNull(response.body()).string());
        } else {
            OkHttpClient extendedTimeoutClient = client.newBuilder()
                    .readTimeout(this.timeout, TimeUnit.SECONDS)
                    .connectTimeout(this.timeout, TimeUnit.SECONDS)
                    .build();
            Call call = extendedTimeoutClient.newCall(request.build());
            Response response = call.execute();
            return new HttpRes(response.code(), Objects.requireNonNull(response.body()).string());
        }
    }

    @Getter
    static class HttpRes {
        private final int code;
        private final String body;

        public HttpRes(int code, String body) {
            this.code = code;
            this.body = body;
        }
    }

}
