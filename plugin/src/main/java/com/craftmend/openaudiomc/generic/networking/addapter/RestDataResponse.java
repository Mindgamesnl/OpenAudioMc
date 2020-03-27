package com.craftmend.openaudiomc.generic.networking.addapter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RestDataResponse {

    private List<RelayHost> assignedEndpoints;
    private String privateKey;
    private String publicKey;

    public RelayHost findInsecureRelay() {
        for (RelayHost assignedEndpoint : assignedEndpoints) {
            if (!assignedEndpoint.isSecure()) return assignedEndpoint;
        }

        return null;
    }

}
