package com.craftmend.openaudiomc.generic.enviroment.models;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;

@Getter
public class Announcement {

    @SerializedName("is_announcement")
    private Boolean hasAnnouncement;

    @SerializedName("announcement_message")
    private String message;

}
