package com.craftmend.openaudiomc.generic.rd.ports;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.ServerEnvironment;
import com.craftmend.openaudiomc.generic.rest.response.NoResponse;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;

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
        if (StorageKey.CDN_SKIP_VALIDATION.getBoolean()) {
            OpenAudioLogger.warn("Was going to check if the cdn was running at " + url() + " but it was skipped by the config");
            return PortCheckResponse.MATCH;
        }

        // anything goes on a test server lol
        OpenAudioLogger.info("Attaching cdn host to " + url());
        if (OpenAudioMc.SERVER_ENVIRONMENT == ServerEnvironment.DEVELOPMENT) {
            return PortCheckResponse.MATCH;
        }

        RestRequest<NoResponse> r = new RestRequest<>(NoResponse.class, Endpoint.LOOPBACK_CHECK);
        r.setTimeout(timeout);
        r.setBaseUrl(url());
        r.run();
        if (!r.hasError()) {
            if (r.getRawResponse().equals(expectedResponse)) {
                return PortCheckResponse.MATCH;
            }
        }
        return PortCheckResponse.FAILED;
    }

}
