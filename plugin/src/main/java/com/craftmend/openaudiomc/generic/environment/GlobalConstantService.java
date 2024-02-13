package com.craftmend.openaudiomc.generic.environment;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.environment.models.ProjectStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class GlobalConstantService extends Service {

    // project status
    @Getter
    private ProjectStatus projectStatus = null;

    @Override
    public void onEnable() {
        scheduleStatusUpdate();
    }

    private void scheduleStatusUpdate() {
        OpenAudioMc.resolveDependency(TaskService.class).runAsync(
                () -> {
                    try {
                        projectStatus = new RestRequest<ProjectStatus>(ProjectStatus.class, Endpoint.GITHUB_VERSION_CHECK)
                                .run()
                                .getResponse();
                    } catch (Exception e) {
                        OpenAudioLogger.error(e, "Failed to check for updates");
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

    public void sendNotifications(User player) {
        if (!player.isAdministrator()) return;
        if (!allowChecks()) return;
        scheduleStatusUpdate();

        boolean notifyUpdates = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_NOTIFY_UPDATES);
        boolean notifyAnnouncements = OpenAudioMc.getInstance().getConfiguration().getBoolean(StorageKey.SETTINGS_NOTIFY_ANNOUNCEMENTS);

        String prefix = MagicValue.COMMAND_PREFIX.get(String.class);

        if (notifyUpdates && isUpdateAvailable()) {
            player.sendMessage(prefix + Platform.translateColors(projectStatus.getVersioning().getImportance()) + " update available!");
            player.sendMessage(prefix + "> " + Platform.translateColors(projectStatus.getVersioning().getUpdateMessage()));
        }

        if (notifyAnnouncements && projectStatus != null && projectStatus.isAnnouncementAvailable()) {
            player.sendMessage(prefix + Platform.translateColors(projectStatus.getAnnouncement().getMessage()));
        }
    }

}
