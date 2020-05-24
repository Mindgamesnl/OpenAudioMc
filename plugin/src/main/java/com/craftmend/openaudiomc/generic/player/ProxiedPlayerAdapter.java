package com.craftmend.openaudiomc.generic.player;

import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import net.md_5.bungee.api.chat.TextComponent;
import net.md_5.bungee.api.connection.ProxiedPlayer;

import java.util.UUID;

@AllArgsConstructor
public class ProxiedPlayerAdapter implements PlayerContainer {

    @Getter private ProxiedPlayer player;

    @Override
    public void sendMessage(String string) {
        player.sendMessage(string);
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        player.sendMessage(textComponent);
    }

    @Override
    public boolean isAdministrator() {
        return player.hasPermission("openaudiomc.*") || player.hasPermission("openaudiomc.tips");
    }

    @Override
    public UUID getUniqueId() {
        return player.getUniqueId();
    }

    @Override
    public String getName() {
        return player.getName();
    }
}
