package com.craftmend.openaudiomc.generic.enviroment.models;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;

@Getter
public class ProjectStatus extends AbstractRestResponse {

    private VersionDetails versioning;
    private Announcement announcement;

    public boolean isLocalLatest() {
        return OpenAudioMc.BUILD.getBuildNumber() >= versioning.getBuildNumber();
    }

    public boolean isAnnouncementAvailable() {
        return announcement.getHasAnnouncement();
    }

}
