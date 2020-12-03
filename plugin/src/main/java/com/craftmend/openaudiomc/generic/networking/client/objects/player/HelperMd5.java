package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.HoverEvent;
import net.md_5.bungee.api.chat.TextComponent;

import java.util.Objects;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

class HelperMd5 {
    static void connectMsg(OpenAudioMc openAudioMc, ClientConnection clientConnection, String token) {
        String url = openAudioMc.getPlusService().getBaseUrl() + token;

        TextComponent message = new TextComponent(translateColors(Objects.requireNonNull(
                StorageKey.MESSAGE_CLICK_TO_CONNECT.getString().replace("{url}", url)
        )));

        TextComponent[] hover = new TextComponent[]{
                new TextComponent(translateColors(
                        StorageKey.MESSAGE_HOVER_TO_CONNECT.getString()
                ))
        };
        message.setClickEvent(new ClickEvent(ClickEvent.Action.OPEN_URL, url));
        message.setHoverEvent(new HoverEvent(HoverEvent.Action.SHOW_TEXT, hover));

        clientConnection.setWaitingToken(true);
        clientConnection.getPlayer().sendMessage(message);
    }
}
