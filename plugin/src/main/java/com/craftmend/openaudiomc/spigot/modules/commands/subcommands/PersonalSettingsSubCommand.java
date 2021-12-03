package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.user.User;

public class PersonalSettingsSubCommand extends SubCommand {

    public PersonalSettingsSubCommand() {
        super("personalsettings");
        ignorePermissions = true;

        registerSubCommands(

        );

        registerArguments(

        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (args.length == 0) {

            return;
        }

        sender.makeExecuteCommand("oa help " + getCommand());
    }
}
