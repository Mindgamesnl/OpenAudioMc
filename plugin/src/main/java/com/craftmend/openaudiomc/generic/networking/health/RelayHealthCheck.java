package com.craftmend.openaudiomc.generic.networking.health;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.state.states.ConnectedState;

import java.util.UUID;

public class RelayHealthCheck implements Runnable {

    @Override
    public void run() {
        // check whether the plugin is connected
        if (!isConnected()) return;

        // do the get
        RestRequest request = new RestRequest(RestEndpoint.CHECK_ACCOUNT_HEALTH);
        ApiResponse output = request.executeInThread();

        if (output == null) {
            // networking error, will already be logged
            return;
        }

        if (output.getErrors().size() > 0) {
            // nevermind lel
            return;
        }

        ServerHealthResponse healthResponse = output.getResponse(ServerHealthResponse.class);

        // this could have taken a bit, so re check the sate to prevent race conditions
        if (!isConnected()) return;

        // might just have nothing
        if (healthResponse == null || healthResponse.getRelay() == null || healthResponse.getRelay().toString().equals(getCurrentRelayId().toString())) return;

        // all is not okay and you should be stressing out, force re-login
        OpenAudioLogger.toConsole("Found a relay signature miss-match for this account. Logging out and restarting network service.");
        OpenAudioMc.getInstance().getNetworkingService().stop();
        OpenAudioMc.getInstance().getNetworkingService().connectIfDown();
        OpenAudioLogger.toConsole("Attempted to recover network service.");
    }

    private boolean isConnected() {
        return OpenAudioMc.getInstance().getStateService().getCurrentState() instanceof ConnectedState;
    }

    public UUID getCurrentRelayId() {
        return ((ConnectedState)OpenAudioMc.getInstance().getStateService().getCurrentState()).getUsedRelay();
    }
}
