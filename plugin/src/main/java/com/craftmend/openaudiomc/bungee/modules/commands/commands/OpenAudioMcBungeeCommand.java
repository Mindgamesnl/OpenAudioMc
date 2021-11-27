package com.craftmend.openaudiomc.bungee.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.player.User;
import com.craftmend.openaudiomc.generic.player.adapters.BungeeUserAdapter;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.plugin.Command;

public class OpenAudioMcBungeeCommand extends Command {

    private final CommandService commandService = OpenAudioMc.getService(CommandService.class);

    /**
     * A set of middleware that to catch commands when the plugin isn't in a running state
     */
    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[] {
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    public OpenAudioMcBungeeCommand() {
        super("openaudiomc", null, "oam", "oa", "openaudio");
    }

    /**
     * A bungeecord wrapper that wraps bungeecord commands to platform independent openaudiomc commands
     * through the internal mini framework
     */
    @Override
    public void execute(CommandSender originalSender, String[] args) {
        User user = new BungeeUserAdapter(originalSender);

        if (args.length == 0) {
            user.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "OpenAudioMc version " + OpenAudioMcBungee.getInstance().getDescription().getVersion() + ". For help, please use /openaudio help");
            return;
        }

        SubCommand subCommand = commandService.getSubCommand(args[0].toLowerCase());

        if (CommandMiddewareExecutor.shouldBeCanceled(user, subCommand, commandMiddleware)) return;

        if (subCommand != null) {
            if (subCommand.isAllowed(user)) {
                String[] subArgs = new String[args.length - 1];
                /*
                 * Move the arguments for the sub command framework
                 */
                if (args.length != 1) System.arraycopy(args, 1, subArgs, 0, args.length - 1);
                try {
                    /*
                     * execute the sub command
                     */
                    subCommand.onExecute(user, subArgs);
                } catch (Exception e) {
                    /*
                     * It's more dead inside then i am
                     */
                    e.printStackTrace();
                    OpenAudioLogger.handleException(e);
                    user.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "An error occurred while executing the command. Please check your command.");
                }
                return;
            } else {
                user.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "You dont have the permissions to do this, sorry!");
                return;
            }
        } else {
            user.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "Unknown sub command: " + args[0].toLowerCase());
            commandService.getSubCommand("help").onExecute(user, args);
            return;
        }
    }
}
