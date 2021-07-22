package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.networking.rest.Task;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import lombok.AllArgsConstructor;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

@AllArgsConstructor
public class Publisher {

    private final ClientConnection clientConnection;

    public void startClientSession() {
        OpenAudioMc openAudioMc = OpenAudioMc.getInstance();
        Configuration config = openAudioMc.getConfiguration();

        // cancel if the player is via proxy because the proxy should handle it
        if (openAudioMc.getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.NODE)
            return;

        if (!config.getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            new CatchLegalBindingMiddleware().continueCommand(clientConnection.getPlayer().asExecutor(), null);
            return;
        }

        if (clientConnection.isConnected()) {
            clientConnection.getPlayer().sendMessage(translateColors(
                    StorageKey.MESSAGE_CLIENT_ALREADY_CONNECTED.getString()
            ));
            return;
        }

        OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> OpenAudioMc.getService(NetworkingService.class).connectIfDown());

        // is it a forced session? we don't need to generate a token if thats the case since
        // it falls back to the base64 pointer
        if (clientConnection.getSession().isForced()) {
            switch (openAudioMc.getPlatform()){
                case SPIGOT:
                case BUNGEE:
                    SpigotHelper.connectMsg(openAudioMc, clientConnection, clientConnection.getSession().getStaticToken(), true);
                    break;
                case VELOCITY:
                    VelocityHelper.connectMsg(openAudioMc, clientConnection, clientConnection.getSession().getStaticToken(), true);
            }

            clientConnection.setWaitingToken(true);
            return;
        }

        // sending waiting message
        clientConnection.getPlayer().sendMessage(translateColors(StorageKey.MESSAGE_GENERATING_SESSION.getString()));

        Task<String> sessionRequest = OpenAudioMc.getService(AuthenticationService.class).getDriver().createPlayerSession(clientConnection);
        sessionRequest.setWhenFails((restErrorType, fuckyou) -> clientConnection.getPlayer().sendMessage(translateColors(StorageKey.MESSAGE_SESSION_ERROR.getString())));

        sessionRequest.setWhenSuccessful(token -> {

            switch (openAudioMc.getPlatform()){
                case SPIGOT:
                case BUNGEE:
                    SpigotHelper.connectMsg(openAudioMc, clientConnection, token, false);
                    break;
                case VELOCITY:
                    VelocityHelper.connectMsg(openAudioMc, clientConnection, token, false);
            }

            clientConnection.setWaitingToken(true);
        });
    }

}
