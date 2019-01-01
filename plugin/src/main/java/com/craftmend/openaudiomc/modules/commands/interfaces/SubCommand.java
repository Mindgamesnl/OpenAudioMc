package com.craftmend.openaudiomc.modules.commands.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.permissions.Permission;

public abstract class SubCommand {

    @Getter
    private String command;

    public SubCommand(String argument) {
        this.command = argument;
        Bukkit.getPluginManager().addPermission(new Permission("openaudiomc.commands." + command));
    }

    public void message(CommandSender sender, String message) {
        sender.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + message);
    }

    public Boolean isAllowed(CommandSender commandSender) {
        return commandSender.hasPermission("openaudiomc.commands." + command)
                || commandSender.hasPermission("openaudiomc.commands.*")
                || commandSender.isOp()
                || commandSender.hasPermission("openaudiomc.*");
    }

    public abstract void onExecute(CommandSender sender, String[] args);

}
