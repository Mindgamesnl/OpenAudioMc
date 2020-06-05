package com.craftmend.openaudiomc.generic.updates;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.updates.models.ProjectStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UpdateService {

    // project status
    @Getter
    private ProjectStatus projectStatus = null;

    private void scheduleStatusUpdate() {
        OpenAudioMc.getInstance().getTaskProvider().runAsync(
                () -> projectStatus = new RestRequest(RestEndpoint.GITHUB_VERSION_CHECK)
                        .executeSync()
                        .getResponse(ProjectStatus.class)
        );
    }

    public boolean isUpdateAvailable() {
        if (projectStatus == null) return false;
        return !projectStatus.isLocalLatest();
    }

    public void sendNotifications(PlayerContainer player) {
        if (!player.isAdministrator()) return;
        scheduleStatusUpdate();

        String prefix = OpenAudioMc.getInstance().getCommandModule().getCommandPrefix();

        if (isUpdateAvailable()) {
            player.sendMessage(prefix + Platform.translateColors(projectStatus.getUpdate().getImportance()) + " update available!");
            player.sendMessage(prefix + "> " + Platform.translateColors(projectStatus.getUpdate().getUpdateMessage()));
        }

        if (projectStatus != null && projectStatus.isAnnouncementAvailable()) {
            player.sendMessage(prefix + Platform.translateColors(projectStatus.getAnnouncement().getMessage()));
        }
    }

}
