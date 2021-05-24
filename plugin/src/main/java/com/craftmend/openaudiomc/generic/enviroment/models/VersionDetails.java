package com.craftmend.openaudiomc.generic.enviroment.models;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;

@Getter
public class VersionDetails {

    @SerializedName("build_number")
    private int buildNumber; // 3832

    @SerializedName("version_importance")
    private String importance; // eg, normal

    @SerializedName("version_update_message")
    private String updateMessage; // why you should update

}
