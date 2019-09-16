package com.craftmend.openaudiomc.spigot.modules.proxy.objects;

import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import lombok.AllArgsConstructor;
import org.bukkit.entity.Player;

@AllArgsConstructor
public class FakeCommandSender implements GenericExecutor {

    private Player player;

    @Override
    public void sendMessage(String message) {
        player.sendMessage(message);
    }

    @Override
    public Boolean hasPermission(String permission) {
        return player.hasPermission(permission);
    }

    @Override
    public Object getOriginal() {
        return player;
    }
}
