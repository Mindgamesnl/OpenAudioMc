package com.craftmend.openaudiomc.generic.networking.health;

import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
public class ServerHealthResponse extends AbstractRestResponse {

    @SerializedName("relay")
    @Expose
    private UUID relay;
    @SerializedName("domain")
    @Expose
    private String domain;
    @SerializedName("startSound")
    @Expose
    private String startSound;
    @SerializedName("backgroundImage")
    @Expose
    private String backgroundImage;
    @SerializedName("clientWelcomeMessage")
    @Expose
    private String clientWelcomeMessage;
    @SerializedName("clientErrorMessage")
    @Expose
    private String clientErrorMessage;
    @SerializedName("title")
    @Expose
    private String title;
    @SerializedName("accentColor")
    @Expose
    private String accentColor;
    @SerializedName("ambianceSound")
    @Expose
    private String ambianceSound;
    @SerializedName("connectButtonText")
    @Expose
    private String connectButtonText;
    @SerializedName("greetingMessage")
    @Expose
    private String greetingMessage;
    @SerializedName("secureEndpoint")
    @Expose
    private String secureEndpoint;

}
