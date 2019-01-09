package com.craftmend.openaudiomc.modules.commands.interfaces;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.modules.commands.objects.Argument;
import lombok.Getter;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.permissions.Permission;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public abstract class SubCommand {

    @Getter private String command;
    @Getter private List<Argument> arguments = new ArrayList<>();

    public SubCommand(String argument) {
        this.command = argument;
        Bukkit.getPluginManager().addPermission(new Permission("openaudiomc.commands." + command));
    }

    protected void message(CommandSender sender, String message) {
        sender.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + message);
    }

    public Boolean isAllowed(CommandSender commandSender) {
        return commandSender.hasPermission("openaudiomc.commands." + command)
                || commandSender.hasPermission("openaudiomc.commands.*")
                || commandSender.isOp()
                || commandSender.hasPermission("openaudiomc.*");
    }

    protected void registerArguments(Argument... args) {
        arguments.addAll(Arrays.asList(args));
    }

    public abstract void onExecute(CommandSender sender, String[] args);

}
