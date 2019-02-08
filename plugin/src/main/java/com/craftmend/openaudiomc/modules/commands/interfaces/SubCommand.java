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

    /**
     * @param argument Your command name. For example "select"
     */
    public SubCommand(String argument) {
        this.command = argument;
        Bukkit.getPluginManager().addPermission(new Permission("openaudiomc.commands." + command));
    }

    /**
     * @param sender Command sender
     * @param message Your message
     */
    protected void message(CommandSender sender, String message) {
        sender.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + message);
    }

    /**
     * @param commandSender Command sender
     * @return true if the player is allowed to execute a command
     */
    public Boolean isAllowed(CommandSender commandSender) {
        return commandSender.hasPermission("openaudiomc.commands." + command)
                || commandSender.hasPermission("openaudiomc.commands.*")
                || commandSender.isOp()
                || commandSender.hasPermission("openaudiomc.*");
    }

    /**
     * @param args Register one (or more) arguments for tab completion and the help menu
     */
    protected void registerArguments(Argument... args) {
        arguments.addAll(Arrays.asList(args));
    }

    /**
     * @param sender the sender that executed the commands
     * @param args the arguments after your command, starting at index 0
     */
    public abstract void onExecute(CommandSender sender, String[] args);

}
