package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.user.User;
import lombok.SneakyThrows;

import java.util.Map;

public class HelpSubCommand extends SubCommand {

    private CommandService commandService;

    public HelpSubCommand() {
        super("help");
        this.commandService = OpenAudioMc.getService(CommandService.class);
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (args.length == 1) {
            args[0] = args[0].toLowerCase();
            SubCommand subCommand = commandService.getSubCommand(args[0]);
            if (subCommand != null) {
                message(sender, "Showing command usage for " + args[0]);
                for (Argument argument : subCommand.getArguments()) {
                    goldMessage(sender, "/openaudio " + subCommand.getCommand() + " " + argument.getSyntax());
                    grayMessage(sender, argument.getDescription());
                }
                return;
            }
        }

        message(sender, "Welcome to the OpenAudioMc help menu! please click one of the following commands for their sub commands and usage");

        for (Map.Entry<String, SubCommand> entry : commandService.getSubCommandHandlers().entrySet()) {
            String command = entry.getKey();
            SubCommand handler = entry.getValue();

            // only render aliases
            if (command.equals(handler.getCommand())) {
                goldClickableMessage(sender, "/openaudiomc " + handler.getCommand(), "oa help " + handler.getCommand());
            }
        }

        message(sender, "For more personal help or other questions, please visit https://help.openaudiomc.net/");
    }

    private void goldMessage(User s, String message) {
        s.sendMessage(" " + getColor("YELLOW") + "> " + getColor("GOLD") + message);
    }

    @SneakyThrows
    private void goldClickableMessage(User s, String message, String command) {
        s.sendClickableCommandMessage(message, "Click here to run " + command, command);
    }

    private void grayMessage(User s, String message) {
        s.sendMessage("  " + getColor("DARK_GRAY") + "> " + getColor("ITALIC") + "" + getColor("GRAY") + message);
    }
}
