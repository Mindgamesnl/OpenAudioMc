package com.craftmend.openaudiomc.generic.rd.ports;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.ServerEnvironment;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;

public class PortChecker {

    private final String ip;
    private final int port;
    private final int timeout;

    public PortChecker(String ip, int port, int timeout) {
        this.timeout = timeout;
        this.ip = ip;
        this.port = port;
    }

    public String url() {
        String pwr = System.getenv("OA_CDN_PUBLIC");
        if (pwr != null && !pwr.equals("")) {
            return pwr;
        }
        return "http://" + this.ip + ":" + this.port;
    }

    public PortCheckResponse test(String expectedResponse) {
        // anything goes on a test server lol
        if (OpenAudioMc.SERVER_ENVIRONMENT == ServerEnvironment.DEVELOPMENT) {
            OpenAudioLogger.toConsole("DEBUG: attaching cdn host to " + url());
            return PortCheckResponse.MATCH;
        }

        RestRequest r = new RestRequest(RestEndpoint.CDN_CHECK, url());
        r.setVerbose(false);
        r.setTimeout(timeout);
        ApiResponse response = r.executeInThread();
        if (response.getErrors().isEmpty()) {
            if (response.responseAsString().equals(expectedResponse)) {
                return PortCheckResponse.MATCH;
            }
        }
        return PortCheckResponse.FAILED;
    }

}
