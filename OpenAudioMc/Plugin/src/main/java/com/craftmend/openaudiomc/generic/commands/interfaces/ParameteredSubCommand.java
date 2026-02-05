package com.craftmend.openaudiomc.generic.commands.interfaces;

import com.craftmend.openaudiomc.generic.commands.helpers.CommandParameters;
import com.craftmend.openaudiomc.api.user.User;

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

        for (String arg : args) {
            if (arg.startsWith("--")) {
                String parameter = arg.substring(2);

                String key;
                String value;

                int eqIndex = parameter.indexOf('=');
                if (eqIndex >= 0) {
                    key = parameter.substring(0, eqIndex);
                    value = parameter.substring(eqIndex + 1);
                } else {
                    key = parameter;
                    value = ""; // no '=' → empty value
                }

                parameters.put(key, value);
            }
        }


        String[] newArgs = new String[args.length - parameters.size()];
        int j = 0;

        for (String arg : args) {
            if (!arg.startsWith("--")) {
                newArgs[j++] = arg;
            }
        }

        onExecute(sender, newArgs, new CommandParameters(parameters));
    }

    public abstract void onExecute(User<?> sender, String[] args, CommandParameters parameters);
}
