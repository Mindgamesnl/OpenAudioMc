package com.craftmend.openaudiomc.generic.updates.models;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.AbstractRestResponse;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;

@Getter
public class ProjectStatus extends AbstractRestResponse {

    private VersionDetails versioning;
    private Announcement announcement;

    public boolean isLocalLatest() {
        return OpenAudioMc.getInstance().getInvoker().getPluginVersion().equals(versioning.getVersionTag());
    }

    public boolean isAnnouncementAvailable() {
        return announcement.getHasAnnouncement();
    }

}
