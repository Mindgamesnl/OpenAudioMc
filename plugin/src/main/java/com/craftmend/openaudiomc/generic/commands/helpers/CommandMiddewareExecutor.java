package com.craftmend.openaudiomc.generic.commands.helpers;

import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;

public class CommandMiddewareExecutor {

    public static boolean shouldBeCanceled(GenericExecutor executor, SubCommand subCommand, CommandMiddleware... middlewares) {
        for (CommandMiddleware middleware : middlewares) {
            if (!middleware.continueCommand(executor, subCommand)) return true;
        }
        return false;
    }

}
