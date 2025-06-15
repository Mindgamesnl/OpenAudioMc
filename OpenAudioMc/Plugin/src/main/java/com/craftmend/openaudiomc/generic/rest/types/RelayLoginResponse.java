package com.craftmend.openaudiomc.generic.rest.types;

import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;

@Getter
public class RelayLoginResponse extends AbstractRestResponse {

    private String relay; // uuid

    @SerializedName("endpoint")
    private String relayEndpoint; // relay endpoint

    private String[] files; // files in a ccount

}
