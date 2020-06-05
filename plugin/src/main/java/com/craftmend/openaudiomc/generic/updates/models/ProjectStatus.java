package com.craftmend.openaudiomc.generic.updates.models;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.google.gson.annotations.SerializedName;
import lombok.Getter;

@Getter
public class ProjectStatus {

    @SerializedName("versioning")
    private VersionDetails update;
    private Announcement announcement;

    public boolean isLocalLatest() {
        return OpenAudioMc.getInstance().getInvoker().getPluginVersion().equals(update.getVersionTag());
    }

    public boolean isAnnouncementAvailable() {
        return announcement.getHasAnnouncement();
    }

}
