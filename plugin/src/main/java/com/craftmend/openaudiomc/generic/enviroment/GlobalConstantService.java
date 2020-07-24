package com.craftmend.openaudiomc.generic.enviroment;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.enviroment.models.ProjectStatus;
import lombok.Getter;

public class GlobalConstantService {

    // project status
    @Getter
    private ProjectStatus projectStatus = null;

    public GlobalConstantService() {
        scheduleStatusUpdate();
    }

    private void scheduleStatusUpdate() {
        OpenAudioMc.getInstance().getTaskProvider().runAsync(
                () -> {
                    try {
                        projectStatus = new RestRequest(RestEndpoint.GITHUB_VERSION_CHECK)
                                .executeInThread()
                                .getResponse(ProjectStatus.class);
                    } catch (Exception e) {
                        // Failed to check
                    }
                }
        );
    }

    public boolean isUpdateAvailable() {
        if (projectStatus == null) return false;
        return !projectStatus.isLocalLatest();
    }

    private boolean allowChecks() {
        boolean notifyUpdates = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_NOTIFY_UPDATES);
        boolean notifyAnnouncements = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_NOTIFY_ANNOUNCEMENTS);
        return notifyAnnouncements || notifyUpdates;
    }

    public void sendNotifications(PlayerContainer player) {
        if (!player.isAdministrator()) return;
        if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) return;
        if (!allowChecks()) return;
        scheduleStatusUpdate();

        boolean notifyUpdates = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_NOTIFY_UPDATES);
        boolean notifyAnnouncements = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_NOTIFY_ANNOUNCEMENTS);

        String prefix = OpenAudioMc.getInstance().getCommandModule().getCommandPrefix();

        if (notifyUpdates && isUpdateAvailable()) {
            player.sendMessage(prefix + Platform.translateColors(projectStatus.getVersioning().getImportance()) + " update available!");
            player.sendMessage(prefix + "> " + Platform.translateColors(projectStatus.getVersioning().getUpdateMessage()));
        }

        if (notifyAnnouncements && projectStatus != null && projectStatus.isAnnouncementAvailable()) {
            player.sendMessage(prefix + Platform.translateColors(projectStatus.getAnnouncement().getMessage()));
        }
    }

}
