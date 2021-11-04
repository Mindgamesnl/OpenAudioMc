package com.craftmend.openaudiomc.velocity.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.helpers.CommandMiddewareExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchCrashMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CatchLegalBindingMiddleware;
import com.craftmend.openaudiomc.generic.commands.middleware.CleanStateCheckMiddleware;
import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.craftmend.openaudiomc.velocity.generic.commands.adapters.VelocityCommandSenderAdapter;
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
        GenericExecutor sender = new VelocityCommandSenderAdapter(invocation.source());
        String[] args = invocation.arguments();

        if (args.length == 0) {
            sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "OpenAudioMc version " + OpenAudioMcVelocity.getInstance().getPluginVersion() + ". For help, please use /openaudio help");
            return;
        }

        SubCommand subCommand = commandService.getSubCommand(args[0].toLowerCase());

        if (CommandMiddewareExecutor.shouldBeCanceled(sender, subCommand, commandMiddleware)) return;

        if (subCommand != null) {
            if (subCommand.isAllowed(sender)) {
                String[] subArgs = new String[args.length - 1];
                /*
                 * Move the arguments for the sub command framework
                 */
                if (args.length != 1) System.arraycopy(args, 1, subArgs, 0, args.length - 1);
                try {
                    /*
                     * execute the sub command
                     */
                    subCommand.onExecute(sender, subArgs);
                } catch (Exception e) {
                    /*
                     * It's more dead inside then i am
                     */
                    e.printStackTrace();
                    OpenAudioLogger.handleException(e);
                    sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "An error occurred while executing the command. Please check your command.");
                }
                return;
            } else {
                sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "You dont have the permissions to do this, sorry!");
                return;
            }
        } else {
            sender.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "Unknown sub command: " + args[0].toLowerCase());
            commandService.getSubCommand("help").onExecute(sender, args);
            return;
        }
    }
}
