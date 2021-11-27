package com.craftmend.openaudiomc.velocity.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
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
import com.craftmend.openaudiomc.generic.player.adapters.VelocityUserAdapter;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.velocitypowered.api.command.SimpleCommand;

public class OpenAudioMcVelocityCommand implements SimpleCommand {

    private final CommandService commandService = OpenAudioMc.getService(CommandService.class);
    private final CommandMiddleware[] commandMiddleware = new CommandMiddleware[]{
            new CatchLegalBindingMiddleware(),
            new CatchCrashMiddleware(),
            new CleanStateCheckMiddleware()
    };

    @Override
    public void execute(Invocation invocation) {
        User user = new VelocityUserAdapter(invocation.source());
        String[] args = invocation.arguments();

        if (args.length == 0) {
            user.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "OpenAudioMc version " + OpenAudioMcVelocity.getInstance().getPluginVersion() + ". For help, please use /openaudio help");
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
