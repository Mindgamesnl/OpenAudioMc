package net.openaudiomc.commands.admin;

import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import org.bukkit.command.CommandSender;

public class CommandReload implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "reload";
    }

    @Override
    public boolean isPlayerCommand() {
        return false;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        Main.get().reloadWebConfig();
        sender.sendMessage(Main.PREFIX + "Reloaded the messages and the config file");
    }
}
