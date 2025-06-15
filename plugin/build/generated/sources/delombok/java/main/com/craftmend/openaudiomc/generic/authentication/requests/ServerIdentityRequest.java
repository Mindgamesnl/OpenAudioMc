package com.craftmend.openaudiomc.generic.authentication.requests;

public class ServerIdentityRequest {
    private String ip;
    private String country;
    private int port;

    public ServerIdentityRequest(final String ip, final String country, final int port) {
        this.ip = ip;
        this.country = country;
        this.port = port;
    }
}
