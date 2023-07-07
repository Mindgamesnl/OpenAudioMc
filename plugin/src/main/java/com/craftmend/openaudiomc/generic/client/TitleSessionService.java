package com.craftmend.openaudiomc.generic.client;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.oac.OpenaudioAccountService;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.service.Inject;
import com.craftmend.openaudiomc.generic.service.Service;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;

import java.util.concurrent.atomic.AtomicInteger;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

public class TitleSessionService extends Service {

    @Inject
    private OpenaudioAccountService accountService;
    @Inject
    private NetworkingService networkingService;
    @Inject
    private AuthenticationService authenticationService;
    @Inject
    private TaskService taskService;

    // check if we should auto start the title session
    public void attemptAutoStart(User user) {
        if (!StorageKey.BEDROCK_NAME_PREFIX_ENABLED.getBoolean()) return;
        String prefix = StorageKey.BEDROCK_NAME_PREFIX_CHARACTER.getString();

        if (user.getName().startsWith(prefix)) {
            // start the title session
            startTokenDisplay(user);
        }
    }

    // force start the display sequence
    public void startTokenDisplay(User user) {
        // send them a message first about us starting
        user.sendMessage(translateColors(StorageKey.MESSAGE_GENERATING_SESSION.getString()));

        // try requesting a NEW token, we usually cache them, but bedrock players need as much time as possible to authenticate
        authenticationService.getDriver().initCache(); // safety for when the server only just started
        authenticationService.getDriver().getSessionCacheMap().delete(user.getUniqueId()); // drop from cache

        ClientConnection client = networkingService.getClient(user.getUniqueId());

        if (client == null) {
            // something went wrong, the client is not connected
            OpenAudioLogger.toConsole("Failed to start title session for " + user.getName() + " because the client is not registered in the networking service");
            user.sendMessage(translateColors(StorageKey.MESSAGE_SESSION_ERROR.getString()));
            return;
        }

        authenticationService.getDriver().createPlayerSession(client)
                .then((token) -> {
                    renderTokenTitle(user, token);
                })
                .catchException((error) -> {
                    OpenAudioLogger.toConsole("Failed to start title session for " + user.getName() + ", error: " + error.getMessage());
                    user.sendMessage(translateColors(StorageKey.MESSAGE_SESSION_ERROR.getString()));
                });
    }

    private void renderTokenTitle(User user, String token) {
        AtomicInteger secondsToShow = new AtomicInteger(StorageKey.BEDROCK_TOKEN_DISPLAY_DURATION.getInt());
        int totalSeconds = secondsToShow.get();
        String subtitle = StorageKey.BEDROCK_TOKEN_SUBTITLE.getString();

        String sanitizedUrl = accountService.getAccountResponse().getClientUrl();
        // replace prefixed https:// or http://
        sanitizedUrl = sanitizedUrl.replace("https://", "");
        sanitizedUrl = sanitizedUrl.replace("http://", "");

        // replace trailing slash, if any
        if (sanitizedUrl.endsWith("/")) {
            sanitizedUrl = sanitizedUrl.substring(0, sanitizedUrl.length() - 1);
        }

        // polyfill the subtitle
        subtitle = subtitle.replace("__address__", sanitizedUrl);

        // auto connect
        OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> OpenAudioMc.getService(NetworkingService.class).connectIfDown());

        // we **coult** do this without a loop, which would be cleaner (as titles themselves support timing data)
        // but that would allow other plugins to override the title, which is not what we want, so this is a pretty
        // adhoc solution to that problem
        // lowkey hacky workaround for lambda final variable issues
        final int[] task = new int[1];
        String finalSubtitle = subtitle;
        task[0] = taskService.scheduleSyncRepeatingTask(() -> {
            if (secondsToShow.get() <= 0) {
                taskService.cancelRepeatingTask(task[0]);
                return;
            }

            // render title
            boolean isFirst = secondsToShow.get() == totalSeconds;
            boolean isLast = secondsToShow.get() == 1;

            // send title
            user.sendTitle(
                    OaColor.LIGHT_PURPLE + token,
                    translateColors(finalSubtitle),
                    isFirst ? 20 : 0,
                    40,
                    isLast ? 20 : 1
            );

            secondsToShow.getAndDecrement();
        }, 0, 20);
    }

}
