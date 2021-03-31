package com.craftmend.openaudiomc.generic.authentication.driver;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.authentication.requests.ClientTokenRequestBody;
import com.craftmend.openaudiomc.generic.authentication.requests.SimpleTokenResponse;
import com.craftmend.openaudiomc.generic.authentication.requests.ServerIdentityRequest;
import com.craftmend.openaudiomc.generic.authentication.response.HostDetailsResponse;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.utils.data.HeatMap;
import com.craftmend.openaudiomc.generic.networking.rest.Task;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class AuthenticationDriver {

    private final AuthenticationService service;
    @Getter private HeatMap<UUID, String> sessionCacheMap = null;

    public void initCache() {
        sessionCacheMap = new HeatMap<>(60, 100, () -> {
            return "";
        });
    }

    public Task<String> createPlayerSession(Authenticatable authenticatable) {
        if (sessionCacheMap == null) {
            initCache();
        }

        Task<String> task = new Task<>();
        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
            // check ache, since there might be a value
            sessionCacheMap.clean();
            HeatMap<UUID, String>.Value entry = sessionCacheMap.get(authenticatable.getOwnerUUID());
            if (!entry.getContext().isEmpty()) {
                task.success(entry.getContext());
                return;
            }

            // create request
            ClientTokenRequestBody requestBody = new ClientTokenRequestBody(
                    "ACCOUNT",
                    authenticatable.getOwnerName(),
                    authenticatable.getOwnerUUID().toString(),
                    authenticatable.getSessionTokens().getWebSessionKey(),
                    service.getServerKeySet().getPublicKey().getValue(),
                    service.getIdentity()
            );

            ApiResponse request = new RestRequest(RestEndpoint.CREATE_SESSION_TOKEN)
                    .setBody(requestBody)
                    .executeInThread();

            if (!request.getErrors().isEmpty()) {
                task.fail(request.getErrors().get(0).getCode());
                return;
            }

            String token = request.getResponse(SimpleTokenResponse.class).getToken();
            task.success(token);

            // push to cache
            entry.setContext(token);
            entry.bump();

            sessionCacheMap.clean();
        });
        return task;
    }

    public String createIdentityToken(HostDetailsResponse host) {
        String ip;
        if (host.getPreProxyForward() == null) {
            ip = host.getIpAddress();
        } else {
            ip = host.getPreProxyForward();
        }

        ServerIdentityRequest requestBody = new ServerIdentityRequest(
                ip,
                host.getCountryCode(),
                OpenAudioMc.getInstance().getInvoker().getServerPort()
        );

        ApiResponse request = new RestRequest(RestEndpoint.CREATE_HOST_TOKEN)
                .setBody(requestBody)
                .executeInThread();

        if (!request.getErrors().isEmpty()) {
            return request.getErrors().get(0).getCode().name();
        }

        return request.getResponse(SimpleTokenResponse.class).getToken();
    }

    public HostDetailsResponse getHost() {
        RestRequest request = new RestRequest(RestEndpoint.GET_HOST_DETAILS);
        ApiResponse response = request.executeInThread();
        if (response.getErrors().size() > 0) {
            OpenAudioLogger.toConsole(OpenAudioMc.getGson().toJson(response.getErrors()));
            throw new IllegalStateException("Could not load host details");
        }
        return response.getResponse(HostDetailsResponse.class);
    }
}
