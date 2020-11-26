package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.storage.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.voicechat.api.util.Task;
import com.craftmend.openaudiomc.spigot.OpenAudioMcSpigot;
import com.craftmend.openaudiomc.spigot.modules.proxy.enums.ClientMode;
import lombok.AllArgsConstructor;

import java.util.Objects;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

@AllArgsConstructor
public class Publisher {

    private final ClientConnection clientConnection;

    public void startClientSession() {
        OpenAudioMc openAudioMc = OpenAudioMc.getInstance();
        ConfigurationImplementation config = openAudioMc.getConfiguration();

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

        openAudioMc.getTaskProvider().runAsync(() -> openAudioMc.getNetworkingService().connectIfDown());

        // sending waiting message
        clientConnection.getPlayer().sendMessage(translateColors(StorageKey.MESSAGE_GENERATING_SESSION.getString()));

        Task<String> sessionRequest = openAudioMc.getAuthenticationService().getDriver().createPlayerSession(clientConnection);
        sessionRequest.setWhenFails((restErrorType, fuckyou) -> {
            clientConnection.getPlayer().sendMessage(translateColors(StorageKey.MESSAGE_SESSION_ERROR.getString()));
        });

        sessionRequest.setWhenSuccessful(token -> {
            switch (openAudioMc.getPlatform()){
                case SPIGOT:
                case BUNGEE:
                    HelperMd5.connectMsg(openAudioMc, clientConnection,token);
                    break;
                case VELOCITY:
                    HelperVelocity.connectMsg(openAudioMc, clientConnection, token);
            }
        });
    }

}
