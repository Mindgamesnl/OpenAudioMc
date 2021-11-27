package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.networking.rest.Task;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.OAClientMode;
import lombok.AllArgsConstructor;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

@AllArgsConstructor
public class Publisher {

    private final ClientConnection clientConnection;

    public void startClientSession() {
        OpenAudioMc openAudioMc = OpenAudioMc.getInstance();
        Configuration config = openAudioMc.getConfiguration();

        // cancel if the player is via proxy because the proxy should handle it
        if (openAudioMc.getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == OAClientMode.NODE)
            return;

        if (!config.getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            new CatchLegalBindingMiddleware().continueCommand(clientConnection.getUser(), null);
            return;
        }

        if (clientConnection.isConnected()) {
            clientConnection.getUser().sendMessage(translateColors(
                    StorageKey.MESSAGE_CLIENT_ALREADY_CONNECTED.getString()
            ));
            return;
        }

        OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> OpenAudioMc.getService(NetworkingService.class).connectIfDown());

        // sending waiting message
        clientConnection.getUser().sendMessage(translateColors(StorageKey.MESSAGE_GENERATING_SESSION.getString()));

        Task<String> sessionRequest = OpenAudioMc.getService(AuthenticationService.class).getDriver().createPlayerSession(clientConnection);
        sessionRequest.setWhenFailed((restErrorType, fuckyou) -> clientConnection.getUser().sendMessage(translateColors(StorageKey.MESSAGE_SESSION_ERROR.getString())));

        sessionRequest.setWhenFinished(token -> {
            String url = OpenAudioMc.getService(CraftmendService.class).getBaseUrl() + "#" + token;
            String msgText = translateColors(StorageKey.MESSAGE_CLICK_TO_CONNECT.getString().replace("{url}", url));
            clientConnection.getUser().sendClickableUrlMessage(msgText, StorageKey.MESSAGE_HOVER_TO_CONNECT.getString(), url);
            clientConnection.setWaitingToken(true);
        });
    }

}
