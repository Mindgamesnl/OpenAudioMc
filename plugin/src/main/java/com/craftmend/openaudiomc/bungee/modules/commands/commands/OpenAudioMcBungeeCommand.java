package com.craftmend.openaudiomc.bungee.modules.commands.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.OpenAudioMcBungee;
import com.craftmend.openaudiomc.generic.commands.CommandModule;
import com.craftmend.openaudiomc.generic.commands.adapters.BungeeCommandSenderAdapter;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import net.md_5.bungee.api.CommandSender;
import net.md_5.bungee.api.plugin.Command;

public class OpenAudioMcBungeeCommand extends Command {

    private CommandModule commandModule = OpenAudioMc.getInstance().getCommandModule();

    public OpenAudioMcBungeeCommand() {
        super("openaudiomc", "openaudiomc.openaudiomc", "oam", "oa", "openaudio");
    }

    @Override
    public void execute(CommandSender originalSender, String[] args) {
        GenericExecutor sender = new BungeeCommandSenderAdapter(originalSender);
        if (!OpenAudioMc.getInstance().getAuthenticationService().getIsSuccesfull()) {
            sender.sendMessage(commandModule.getCommandPrefix() + OpenAudioMc.getInstance().getAuthenticationService().getFailureMessage());
            return;
        }

        if (args.length == 0) {
            sender.sendMessage(commandModule.getCommandPrefix() + "OpenAudioMc version " + OpenAudioMcBungee.getInstance().getDescription().getVersion() + ". For help, please use /openaudio help");
            return;
        }

        SubCommand subCommand = commandModule.getSubCommand(args[0].toLowerCase());
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
                    sender.sendMessage(commandModule.getCommandPrefix() + "An error occurred while executing the command. Please check your command.");
                }
                return;
            } else {
                sender.sendMessage(commandModule.getCommandPrefix() + "You dont have the permissions to do this, sorry!");
                return;
            }
        } else {
            sender.sendMessage(commandModule.getCommandPrefix() + "Unknown sub command: " + args[0].toLowerCase());
            commandModule.getSubCommand("help").onExecute(sender, args);
            return;
        }
    }
}
