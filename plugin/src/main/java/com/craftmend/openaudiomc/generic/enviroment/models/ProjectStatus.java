package com.craftmend.openaudiomc.generic.enviroment.models;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;

@Getter
public class ProjectStatus extends AbstractRestResponse {

    private VersionDetails versioning;
    private Announcement announcement;
    private ProjectConfiguration configuration;

    public boolean isLocalLatest() {
        return OpenAudioMc.getInstance().getInvoker().getPluginVersion().equals(versioning.getVersionTag());
    }

    public boolean isAnnouncementAvailable() {
        return announcement.getHasAnnouncement();
    }

}
