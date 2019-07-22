package com.craftmend.openaudiomc.generic.commands.adapters;

import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.CommandSender;

@AllArgsConstructor
public class BungeeCommandSenderAdapter implements GenericExecutor {

    private CommandSender commandSender;

    @Override
    public void sendMessage(String message) {
        commandSender.sendMessage(message);
    }

    @Override
    public Boolean hasPermission(String permission) {
        return commandSender.hasPermission(permission);
    }

    @Override
    public Object getOriginal() {
        return commandSender;
    }
}
