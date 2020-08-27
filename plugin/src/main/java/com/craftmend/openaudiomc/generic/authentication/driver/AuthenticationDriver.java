package com.craftmend.openaudiomc.generic.authentication.driver;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.authentication.requests.ClientTokenRequestBody;
import com.craftmend.openaudiomc.generic.authentication.requests.SimpleTokenResponse;
import com.craftmend.openaudiomc.generic.authentication.requests.ServerIdentityRequest;
import com.craftmend.openaudiomc.generic.authentication.response.HostDetailsResponse;
import com.craftmend.openaudiomc.generic.networking.interfaces.Authenticatable;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.voicechat.api.util.Task;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthenticationDriver {

    private AuthenticationService service;

    public Task<String> createPlayerSession(Authenticatable authenticatable) {
        Task<String> task = new Task<>();
        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
            // create request
            ClientTokenRequestBody requestBody = new ClientTokenRequestBody(
                    authenticatable.getOwnerName(),
                    authenticatable.getOwnerUUID().toString(),
                    authenticatable.getSessionTokens().getKey(),
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

            task.success(request.getResponse(SimpleTokenResponse.class).getToken());
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
        if (response.getErrors().size() > 0) throw new IllegalStateException("Could not load host details");
        return response.getResponse(HostDetailsResponse.class);
    }
}
