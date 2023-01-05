package com.craftmend.openaudiomc.generic.rd.ports;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.ServerEnvironment;
import com.craftmend.openaudiomc.generic.rest.response.NoResponse;
import com.craftmend.openaudiomc.generic.rest.target.Endpoint;

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

        String awr = System.getProperty("oaForcedIp");
        if (awr != null && !awr.equals("")) {
            return awr;
        }

        return "http://" + this.ip + ":" + this.port;
    }

    public PortCheckResponse test(String expectedResponse) {
        // anything goes on a test server lol
        if (OpenAudioMc.SERVER_ENVIRONMENT == ServerEnvironment.DEVELOPMENT) {
            OpenAudioLogger.toConsole("DEBUG: attaching cdn host to " + url());
            return PortCheckResponse.MATCH;
        }

        RestRequest<NoResponse> r = new RestRequest<>(NoResponse.class, Endpoint.LOOPBACK_CHECK);
        r.setTimeout(timeout);
        r.run();
        if (!r.hasError()) {
            if (r.getRawResponse().equals(expectedResponse)) {
                return PortCheckResponse.MATCH;
            }
        }
        return PortCheckResponse.FAILED;
    }

}
