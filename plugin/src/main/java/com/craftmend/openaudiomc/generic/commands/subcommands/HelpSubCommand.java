package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.TextComponent;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;

public class HelpSubCommand extends SubCommand {

    private CommandModule commandModule;

    public HelpSubCommand() {
        super("help");
        this.commandModule = OpenAudioMc.getInstance().getCommandModule();
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        if (args.length == 1) {
            args[0] = args[0].toLowerCase();
            SubCommand subCommand = commandModule.getSubCommand(args[0]);
            if (subCommand != null) {
                message(sender, "Showing command usage for " + args[0]);
                for (Argument argument : subCommand.getArguments()) {
                    goldMessage(sender, "/openaudio " + subCommand.getCommand() + " " + argument.getSyntax());
                    grayMessage(sender, argument.getDescription());
                }
                return;
            }
        }

            message(sender, "Welcome to the OpenAudioMc help menu! please click one of the following commands for their subcommands and ussage");
            for (SubCommand subCommandHandler : commandModule.getSubCommandHandlers()) {
                goldClickableMessage(sender, "/openaudiomc " + subCommandHandler.getCommand(), "oa help " + subCommandHandler.getCommand());
            }
            message(sender, "For more personal help or other questions, please visit https://help.openaudiomc.net/");
    }

    private void goldMessage(GenericExecutor s, String message) {
        s.sendMessage(" " + ChatColor.YELLOW + "> " + ChatColor.GOLD + message);
    }

    private void goldClickableMessage(GenericExecutor s, String message, String command) {
        if (s instanceof Player) {
            TextComponent component = new TextComponent(" " + ChatColor.YELLOW + "> " + ChatColor.GOLD + message);
            component.setClickEvent(new ClickEvent(ClickEvent.Action.RUN_COMMAND, "/" + command));
            Player player = (Player) s;
            player.spigot().sendMessage(component);
        } else {
            s.sendMessage(" " + ChatColor.YELLOW + "> " + ChatColor.GOLD + message + ChatColor.GRAY + ". (" + command + ")");
        }

    }

    private void grayMessage(GenericExecutor s, String message) {
        s.sendMessage("  " + ChatColor.DARK_GRAY + "> " + ChatColor.ITALIC + "" + ChatColor.GRAY + message);
    }
}
