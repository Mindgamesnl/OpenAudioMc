package net.openaudiomc.commands;

import org.bukkit.command.CommandSender;

public interface OpenAudioCommand {

    void execute(CommandSender sender, String[] args);

    String getSubCommand();

    boolean isPlayerCommand();
}