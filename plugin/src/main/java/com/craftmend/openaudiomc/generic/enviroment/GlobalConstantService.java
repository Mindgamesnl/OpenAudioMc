package com.craftmend.openaudiomc.generic.enviroment;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.enviroment.models.ProjectStatus;
import lombok.Getter;

public class GlobalConstantService extends Service {

    // project status
    @Getter
    private ProjectStatus projectStatus = null;

    public GlobalConstantService() {
        scheduleStatusUpdate();
    }

    private void scheduleStatusUpdate() {
        OpenAudioMc.resolveDependency(TaskService.class).runAsync(
                () -> {
                    try {
                        projectStatus = new RestRequest(RestEndpoint.GITHUB_VERSION_CHECK)
                                .executeInThread()
                                .getResponse(ProjectStatus.class);
                    } catch (Exception e) {
                        OpenAudioLogger.handleException(e);
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
        if (!allowChecks()) return;
        scheduleStatusUpdate();

        boolean notifyUpdates = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_NOTIFY_UPDATES);
        boolean notifyAnnouncements = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_NOTIFY_ANNOUNCEMENTS);

        String prefix = OpenAudioMc.getService(CommandService.class).getCommandPrefix();

        if (notifyUpdates && isUpdateAvailable()) {
            player.sendMessage(prefix + Platform.translateColors(projectStatus.getVersioning().getImportance()) + " update available!");
            player.sendMessage(prefix + "> " + Platform.translateColors(projectStatus.getVersioning().getUpdateMessage()));
        }

        if (notifyAnnouncements && projectStatus != null && projectStatus.isAnnouncementAvailable()) {
            player.sendMessage(prefix + Platform.translateColors(projectStatus.getAnnouncement().getMessage()));
        }
    }

}
