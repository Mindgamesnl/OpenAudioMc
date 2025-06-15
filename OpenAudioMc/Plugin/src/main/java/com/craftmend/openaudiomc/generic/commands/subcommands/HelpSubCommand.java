package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.generic.commands.enums.CommandContext;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.user.User;
import lombok.Setter;
import lombok.SneakyThrows;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class HelpSubCommand extends SubCommand {

    private final CommandContext context;
    private final boolean useHelpTrail;

    @Setter private String headerMessage = "Welcome to OpenAudioMc! Please click the sub command you need help with.";

    public HelpSubCommand(CommandContext context, boolean useHelpTrail) {
        super("help");
        ignorePermissions = true;
        this.context = context;
        this.useHelpTrail = useHelpTrail;
        registerArguments(new Argument("<command>", "Show help for a specific command"));
    }

    @Override
    public void onExecute(User<?> sender, String[] args) {
        if (args.length == 1) {
            args[0] = args[0].toLowerCase();
            SubCommand subCommand = commandService.getSubCommand(context, args[0]);
            if (subCommand != null) {
                message(sender, "Showing command usage for " + args[0]);
                for (Argument argument : subCommand.getArguments()) {
                    goldMessage(sender, "/" + context.getBaseCommand() + " " + subCommand.getCommand() + " " + argument.getSyntax());
                    grayMessage(sender, argument.getDescription());
                }
                return;
            }
        }

        message(sender, headerMessage);

        for (Map.Entry<String, SubCommand> entry : commandService.getSubCommandHandlers(context).entrySet()) {
            String command = entry.getKey();
            SubCommand handler = entry.getValue();

            // only render aliases
            if (command.equals(handler.getCommand()) && handler.isListed()) {
                StringBuilder optionalDelegates = new StringBuilder();
                boolean hasDelegates = false;
                if (!handler.getArguments().isEmpty()) {
                    Set<String> arguments = new HashSet<>();

                    for (Argument argument : handler.getArguments()) {
                        String base = argument.getBase();
                        if (!base.isEmpty()) arguments.add(argument.getBase());
                    }

                    optionalDelegates.append(OaColor.GRAY + "[");
                    int argCount = arguments.size();
                    int index = 0;
                    for (String argument : arguments) {
                        optionalDelegates.append(OaColor.DARK_GRAY).append(argument);
                        if (index != argCount - 1) {
                            optionalDelegates.append(OaColor.GRAY + "|");
                        }
                        index++;
                    }
                    optionalDelegates.append(OaColor.GRAY + "]");
                    hasDelegates = index > 0;
                }

                goldClickableMessage(sender, "/" + context.getBaseCommand() + " " + handler.getCommand() + " " + (hasDelegates ? optionalDelegates.toString() : ""), context.getBaseCommand() + " help " + handler.getCommand());
            }
        }

        if (this.useHelpTrail)
            message(sender, "For more personal help or other questions, please visit https://openaudiomc.net/docs");
    }

    private void goldMessage(User<?> s, String message) {
        s.sendMessage(" " + getColor("YELLOW") + "> " + getColor("GOLD") + message);
    }

    @SneakyThrows
    private void goldClickableMessage(User<?> s, String message, String command) {
        s.sendClickableCommandMessage(OaColor.GOLD + " > " + message, "Click here to run " + command, command);
    }

    private void grayMessage(User<?> s, String message) {
        s.sendMessage("  " + getColor("DARK_GRAY") + "> " + getColor("ITALIC")+ getColor("GRAY") + message);
    }
}
