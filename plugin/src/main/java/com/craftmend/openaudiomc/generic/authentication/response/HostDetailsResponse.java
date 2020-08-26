package com.craftmend.openaudiomc.generic.authentication.response;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class HostDetailsResponse extends AbstractRestResponse {

    @SerializedName("ip")
    private String ipAddress;
    @SerializedName("country")
    private String countryCode;
    @SerializedName("fwf")
    private String preProxyForward;

}
