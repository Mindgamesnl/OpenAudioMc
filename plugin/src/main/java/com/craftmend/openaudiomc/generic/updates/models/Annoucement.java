package com.craftmend.openaudiomc.generic.updates.models;

import com.google.gson.annotations.SerializedName;
import lombok.Getter;

@Getter
public class Annoucement {

    @SerializedName("is_announcement")
    private boolean hasAnnouncement;

    @SerializedName("announcement_message")
    private String message;

}
