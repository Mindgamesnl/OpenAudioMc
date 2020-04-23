package com.craftmend.openaudiomc.generic.rest.responses.login;

import lombok.Data;

import java.util.UUID;

@Data
public class PlusServer {

    private UUID relayId;
    private String insecureEndpoint;
    private String secureEndpoint;

}
