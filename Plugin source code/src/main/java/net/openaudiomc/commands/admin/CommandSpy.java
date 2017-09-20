package net.openaudiomc.commands.admin;

import net.openaudiomc.actions.Spy;
import net.openaudiomc.commands.OpenAudioCommand;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandSpy implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "spy";
    }

    @Override
    public boolean isPlayerCommand() {
        return true;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        Player player = (Player) sender;
        Spy.toggleSpy(player);
    }
}
