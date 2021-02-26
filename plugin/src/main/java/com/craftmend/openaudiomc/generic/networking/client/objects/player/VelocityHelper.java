package com.craftmend.openaudiomc.generic.networking.client.objects.player;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.velocity.generic.player.VelocityPlayerAdapter;
import com.velocitypowered.api.proxy.Player;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.event.ClickEvent;
import net.kyori.adventure.text.event.HoverEvent;

import java.util.Objects;

import static com.craftmend.openaudiomc.generic.platform.Platform.translateColors;

class VelocityHelper {

    static void connectMsg(OpenAudioMc openAudioMc, ClientConnection clientConnection, String token, boolean isForced) {
        String url;

        if (isForced) {
            url = openAudioMc.getCraftmendService().getBaseUrl() + "?&data=" + token;
        } else {
            url = openAudioMc.getCraftmendService().getBaseUrl() + "#" + token;
        }

        String msgText = translateColors(StorageKey.MESSAGE_CLICK_TO_CONNECT.getString().replace("{url}", url));
        Component message = Component.text(Objects.requireNonNull(msgText));

        message = message.clickEvent(ClickEvent.clickEvent(ClickEvent.Action.OPEN_URL, url));

        String hoverText = translateColors(StorageKey.MESSAGE_HOVER_TO_CONNECT.getString());
        message = message.hoverEvent(HoverEvent.hoverEvent(HoverEvent.Action.SHOW_TEXT, Component.text(Objects.requireNonNull(hoverText))));

        clientConnection.setWaitingToken(true);
        Player player = ((VelocityPlayerAdapter) clientConnection.getPlayer()).getPlayer();
        player.sendMessage(message);
    }

}
