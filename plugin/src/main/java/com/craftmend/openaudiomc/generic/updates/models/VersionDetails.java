package com.craftmend.openaudiomc.generic.updates.models;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;

@Getter
public class VersionDetails {

    @SerializedName("version_tag")
    private String versionTag; // eg, 1.0.0

    @SerializedName("version_importance")
    private String importance; // eg, normal

    @SerializedName("version_update_message")
    private String updateMessage; // why you should update

}
