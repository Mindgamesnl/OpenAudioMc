package com.craftmend.openaudiomc.generic.player;

import com.craftmend.openaudiomc.generic.networking.client.interfaces.PlayerContainer;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.entity.Player;

import java.util.UUID;

@AllArgsConstructor
public class SpigotPlayerAdapter implements PlayerContainer {

    private Player player;

    @Override
    public void sendMessage(String string) {
        player.sendMessage(string);
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        player.spigot().sendMessage(textComponent);
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
