package com.craftmend.openaudiomc.generic.updates;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.updates.models.ProjectStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UpdateService {

    // project status
    @Getter private ProjectStatus projectStatus = null;

    private void updateProjectStatus() {
        OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
            projectStatus = new RestRequest(RestEndpoint.GITHUB_VERSION_CHECK)
                    .executeSync()
                    .getResponse(ProjectStatus.class);
        });
    }

    public boolean isUpdateAvailable() {
        if (projectStatus == null) return false;
        updateProjectStatus();
        return !projectStatus.isLocalLatest();
    }

}
