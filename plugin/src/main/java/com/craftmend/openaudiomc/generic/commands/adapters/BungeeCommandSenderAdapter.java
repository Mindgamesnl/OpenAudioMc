package com.craftmend.openaudiomc.generic.commands.adapters;

import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import lombok.AllArgsConstructor;
import org.bukkit.command.CommandSender;

@AllArgsConstructor
public class SpigotCommandSenderAdapter implements GenericExecutor {

    private CommandSender commandSender;

    @Override
    public void sendMessage(String message) {
        commandSender.sendMessage(message);
    }

    @Override
    public Object getOriginal() {
        return commandSender;
    }
}
