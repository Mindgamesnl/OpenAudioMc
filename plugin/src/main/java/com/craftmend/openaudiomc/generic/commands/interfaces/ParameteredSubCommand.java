package com.craftmend.openaudiomc.generic.commands.interfaces;

import com.craftmend.openaudiomc.generic.commands.helpers.CommandParameters;
import com.craftmend.openaudiomc.generic.user.User;

import java.util.HashMap;
import java.util.Map;

public abstract class ParameteredSubCommand extends SubCommand {

    public ParameteredSubCommand(String argument) {
        super(argument);
    }

    public ParameteredSubCommand(String argument, String... aliases) {
        super(argument, aliases);
    }

    @Override
    public void onExecute(User<?> sender, String[] args) {
        // go over all args, and find ones that start with --
        // these are parameters, and should be parsed into a map
        // we'll then reconstruct the args array without the parameters
        Map<String, String> parameters = new HashMap<>();

        for (int i = 0; i < args.length; i++) {
            String arg = args[i];
            if (arg.startsWith("--") && arg.contains("=")) {
                String parameter = arg.substring(2);
                String[] split = parameter.split("=");
                String key = split[0];
                String value = split[1];
                parameters.put(key, value);
            }
        }

        // remove all parameters from the args array
        String[] newArgs = new String[args.length - parameters.size()];
        int j = 0;
        for (int i = 0; i < args.length; i++) {
            if (!args[i].startsWith("--")) {
                newArgs[j] = args[i];
                j++;
            }
        }

        onExecute(sender, newArgs, new CommandParameters(parameters));
    }

    public abstract void onExecute(User<?> sender, String[] args, CommandParameters parameters);
}
