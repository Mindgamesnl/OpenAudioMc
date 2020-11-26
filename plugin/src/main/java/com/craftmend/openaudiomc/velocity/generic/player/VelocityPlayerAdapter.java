package com.craftmend.openaudiomc.velocity.generic.player;

import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import com.velocitypowered.api.proxy.Player;
import lombok.AllArgsConstructor;
import lombok.Getter;
import net.kyori.adventure.text.Component;
import net.md_5.bungee.api.chat.TextComponent;

import java.util.UUID;

@AllArgsConstructor
public class VelocityPlayerAdapter implements PlayerContainer {

    @Getter
    private final Player player;

    @Override
    public void sendMessage(String string) {
        player.sendMessage(Component.text(string));
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        sendMessage(textComponent.getText());
    }

    @Override
    public boolean isAdministrator() {
        return player.hasPermission("openaudiomc.tips");
    }

    @Override
    public UUID getUniqueId() {
        return player.getUniqueId();
    }

    @Override
    public String getName() {
        return player.getUsername();
    }
}
