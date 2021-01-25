package com.craftmend.openaudiomc.generic.authentication.requests;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ServerIdentityRequest {

    private String ip;
    private String country;
    private int port;

}
