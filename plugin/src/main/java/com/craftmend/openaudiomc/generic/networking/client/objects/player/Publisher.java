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
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.HoverEvent;
import net.md_5.bungee.api.chat.TextComponent;

import java.util.Objects;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

@AllArgsConstructor
public class Publisher {
    
    private final ClientConnection clientConnection;

    public void startClientSession() {
        OpenAudioMc openAudioMc = OpenAudioMc.getInstance();
        ConfigurationImplementation config = openAudioMc.getConfiguration();
        
        // cancel if the player is via bungee because bungee should handle it
        if (openAudioMc.getPlatform() == Platform.SPIGOT && OpenAudioMcSpigot.getInstance().getProxyModule().getMode() == ClientMode.NODE)
            return;

        if (!config.getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            new CatchLegalBindingMiddleware().continueCommand(clientConnection.getPlayer().asExecutor(), null);
            return;
        }

        if (clientConnection.isConnected()) {
            clientConnection.getPlayer().sendMessage(translateColors(Objects.requireNonNull(
                    config.getString(StorageKey.MESSAGE_CLIENT_ALREADY_CONNECTED)
            )));
            return;
        }
        
        openAudioMc.getTaskProvider().runAsync(() -> openAudioMc.getNetworkingService().connectIfDown());

        // sending waiting message
        clientConnection.getPlayer().sendMessage(translateColors(config.getString(StorageKey.MESSAGE_GENERATING_SESSION)));

        Task<String> sessionRequest = openAudioMc.getAuthenticationService().getDriver().createPlayerSession(clientConnection);
        sessionRequest.setWhenFails((restErrorType, fuckyou) -> {
            clientConnection.getPlayer().sendMessage(translateColors(config.getString(StorageKey.MESSAGE_SESSION_ERROR)));
        });
        
        sessionRequest.setWhenSuccessful(token -> {
            String url = openAudioMc.getPlusService().getBaseUrl() + token;
            
            TextComponent message = new TextComponent(translateColors(Objects.requireNonNull(
                    config.getString(StorageKey.MESSAGE_CLICK_TO_CONNECT).replace("{url}", url)
            )));
            TextComponent[] hover = new TextComponent[] {
                    new TextComponent(translateColors(Objects.requireNonNull(
                            config.getString(StorageKey.MESSAGE_HOVER_TO_CONNECT)
                    )))
            };
            message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, url));
            message.setHoverEvent(new HoverEvent(HoverEvent.Action.SHOW_TEXT, hover));

            clientConnection.setWaitingToken(true);
            clientConnection.getPlayer().sendMessage(message);
        });
    }
    
}
