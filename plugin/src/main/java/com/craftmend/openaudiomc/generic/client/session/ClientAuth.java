package com.craftmend.openaudiomc.generic.client.session;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.client.objects.ClientConnection;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.networking.rest.Task;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.OAClientMode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

@Getter
@AllArgsConstructor
public class ClientAuth implements Serializable {

    @Setter private transient ClientConnection client;
    private String webSessionKey;
    private String staticToken;

    public boolean isKeyCorrect(String input) {
        return webSessionKey.equals(input);
    }

    public void publishSessionUrl() {
        OpenAudioMc openAudioMc = OpenAudioMc.getInstance();
        Configuration config = openAudioMc.getConfiguration();
        String baseUrl = OpenAudioMc.getService(CraftmendService.class).getAccountResponse().getSettings().getClientUrl();

        // cancel if the player is via proxy because the proxy should handle it
        if (openAudioMc.getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == OAClientMode.NODE)
            return;

        if (!config.getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            new CatchLegalBindingMiddleware().continueCommand(client.getUser(), null);
            return;
        }

        if (client.isConnected()) {
            client.getUser().sendMessage(translateColors(
                    StorageKey.MESSAGE_CLIENT_ALREADY_CONNECTED.getString()
            ));
            return;
        }

        OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> OpenAudioMc.getService(NetworkingService.class).connectIfDown());

        // sending waiting message
        client.getUser().sendMessage(translateColors(StorageKey.MESSAGE_GENERATING_SESSION.getString()));

        Task<String> sessionRequest = OpenAudioMc.getService(AuthenticationService.class).getDriver().createPlayerSession(client);
        sessionRequest.setWhenFailed((restErrorType, fuckyou) -> client.getUser().sendMessage(translateColors(StorageKey.MESSAGE_SESSION_ERROR.getString())));

        sessionRequest.setWhenFinished(token -> {
            String url = baseUrl + "#" + token;
            String msgText = translateColors(StorageKey.MESSAGE_CLICK_TO_CONNECT.getString()
                    .replace("{url}", url)
                    .replace("{token}", token));
            client.getUser().sendClickableUrlMessage(msgText, StorageKey.MESSAGE_HOVER_TO_CONNECT.getString(), url);
            client.getSession().setWaitingToken(true);
        });
    }


}
