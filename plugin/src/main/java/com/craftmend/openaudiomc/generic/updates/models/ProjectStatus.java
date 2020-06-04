package com.craftmend.openaudiomc.generic.updates.models;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.google.gson.annotations.SerializedName;

public class ProjectStatus {

    @SerializedName("versioning")
    private VersionDetails update;
    private Annoucement annoucement;

    public boolean isLocalLatest() {
        return OpenAudioMc.getInstance().getInvoker().getPluginVersion().equals(update.getVersionTag());
    }

}
