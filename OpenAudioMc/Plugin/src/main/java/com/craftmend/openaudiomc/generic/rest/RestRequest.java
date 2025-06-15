package com.craftmend.openaudiomc.generic.rest;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import com.craftmend.openaudiomc.generic.rest.response.IntermediateResponse;
import com.craftmend.openaudiomc.generic.rest.response.SectionError;
import com.craftmend.openaudiomc.generic.rest.response.ShorthandResponse;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import com.craftmend.openaudiomc.generic.rest.routes.Method;
import lombok.Getter;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;

import java.net.SocketTimeoutException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import static com.craftmend.openaudiomc.generic.networking.certificate.CertificateHelper.ignore;

public class RestRequest<T extends AbstractRestResponse> {

    private SectionError sectionError = SectionError.NONE;
    private Endpoint endpoint;
    private Map<String, String> queryParameters = new HashMap<>();
    private T response;
    private String baseUrl = null;
    private RequestBody postBody = null;
    private Method method = Method.GET;
    private int timeout = -1;
    private boolean parseResponse = true;
    private Class<T> typeClass;
    private String rawResponse = null;

    public RestRequest(Class<T> typeClass, Endpoint endpoint) {
        this.endpoint = endpoint;
        this.typeClass = typeClass;
    }

    public boolean hasError() {
        return sectionError != SectionError.NONE;
    }

    public SectionError getError() {
        return sectionError;
    }

    public RestRequest<T> setQuery(String key, String value) {
        queryParameters.put(key, value);
        return this;
    }

    public String getRawResponse() {
        return rawResponse;
    }

    public RestRequest<T> dontParseResponse() {
        this.parseResponse = false;
        return this;
    }

    public T getResponse() {
        return response;
    }

    public RestRequest<T> setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
        // remove trailing slash, if any
        if (this.baseUrl.endsWith("/")) {
            this.baseUrl = this.baseUrl.substring(0, this.baseUrl.length() - 1);
        }
        return this;
    }

    public RestRequest<T> withPostJsonObject(Object o) {
        this.postBody = RequestBody.create(OpenAudioMc.getGson().toJson(o), MediaType.get("application/json; charset=utf-8"));
        this.method = Method.POST;
        return this;
    }

    public RestRequest<T> setTimeout(int timeout) {
        this.timeout = timeout;
        return this;
    }

    public RestRequest<T> run() {
        HttpRes res = this.preformRequest();

        // catch timeout
        if (res.code == 408) {
            sectionError = SectionError.TIMEOUT;
            return this;
        }

        // is it a 500?
        if (res.code == 500) {
            sectionError = SectionError.SERVER_ERROR;
            return this;
        }

        // is it a 404?
        if (res.code == 404) {
            sectionError = SectionError.NOT_FOUND;
            return this;
        }

        // ok, now parse it
        rawResponse = res.body;
        IntermediateResponse<T> intermediateResponse = IntermediateResponse.fromJson(typeClass, res.body, parseResponse);

        // copy over the error and response
        sectionError = intermediateResponse.getError();
        response = intermediateResponse.getResponse(typeClass);
        return this;
    }

    public CompletableFuture<ShorthandResponse<T>> runAsync() {
        CompletableFuture<ShorthandResponse<T>> future = new CompletableFuture<>();
        OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> {
            try {
                this.run();
                future.complete(new ShorthandResponse<T>(this.response, this.sectionError));
            } catch (Exception e) {
                future.completeExceptionally(e);
            }
        });
        return future;
    }

    public String buildURL() {
        String url = endpoint.getURL(this.baseUrl); // uses the default baseurl if null

        // add query params
        if (queryParameters.size() > 0) {
            url = url + "?";
            for (Map.Entry<String, String> entry : queryParameters.entrySet()) {
                url = url + entry.getKey() + "=" + entry.getValue() + "&";
            }
            url = url.substring(0, url.length() - 1);
        }
        return url;
    }

    private HttpRes preformRequest() {
        // reset state
        sectionError = SectionError.NONE;
        response = null;
        rawResponse = null;

        // create request
        Request.Builder requestBuilder = new Request.Builder()
                .url(buildURL())
                .header("oa-env", OpenAudioMc.SERVER_ENVIRONMENT.toString());

        if (method == Method.POST) {
            requestBuilder = requestBuilder.post(postBody);
        } else {
            requestBuilder = requestBuilder.get();
        }

        OkHttpClient.Builder clientBuilder = new OkHttpClient.Builder();
        OkHttpClient client = null;

        if (timeout != -1) {
            clientBuilder.readTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS);
            clientBuilder.connectTimeout(timeout, java.util.concurrent.TimeUnit.SECONDS);
        }

        if (OpenAudioMc.SERVER_ENVIRONMENT == ServerEnvironment.DEVELOPMENT) {
            OpenAudioLogger.warn("Running in development mode, disabling SSL verification");
            clientBuilder = ignore(clientBuilder);
        }
        client = clientBuilder.build();

        try {
            okhttp3.Response response = client.newCall(requestBuilder.build()).execute();
            return new HttpRes(response.code(), response.body().string());
        } catch (Exception e) {
            if (!(e instanceof SocketTimeoutException))
                e.printStackTrace();
            return new HttpRes(408, "Request timed out");
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
