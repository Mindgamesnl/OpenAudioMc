package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import lombok.SneakyThrows;

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

            message(sender, "Welcome to the OpenAudioMc help menu! please click one of the following commands for their sub commands and usage");
            for (SubCommand subCommandHandler : commandModule.getSubCommandHandlers()) {
                goldClickableMessage(sender, "/openaudiomc " + subCommandHandler.getCommand(), "oa help " + subCommandHandler.getCommand());
            }
            message(sender, "For more personal help or other questions, please visit https://help.openaudiomc.net/");
    }

    private void goldMessage(GenericExecutor s, String message) {
        s.sendMessage(" " + getColor("YELLOW") + "> " + getColor("GOLD") + message);
    }

    @SneakyThrows
    private void goldClickableMessage(GenericExecutor s, String message, String command) {
        switch (OpenAudioMc.getInstance().getPlatform()){
            case SPIGOT:
            case BUNGEE:
                HelperMd5.goldClickableMessage(s,message,command);
                break;
            case VELOCITY:
                HelperVelocity.goldClickableMessage(s,message,command);
                break;
            default:
                s.sendMessage(" " + getColor("YELLOW") + "> " + getColor("GOLD") + message + getColor("GRAY") + ". (" + command + ")");
        }
    }

    private void grayMessage(GenericExecutor s, String message) {
        s.sendMessage("  " + getColor("DARK_GRAY") + "> " + getColor("ITALIC") + "" + getColor("GRAY") + message);
    }
}
