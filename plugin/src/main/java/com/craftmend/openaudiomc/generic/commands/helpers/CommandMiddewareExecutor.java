package com.craftmend.openaudiomc.generic.commands.helpers;

import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.user.User;

public class CommandMiddewareExecutor {

    public static boolean shouldBeCanceled(User executor, SubCommand subCommand, CommandMiddleware... middlewares) {
        for (CommandMiddleware middleware : middlewares) {
            if (!middleware.continueCommand(executor, subCommand)) return true;
        }
        return false;
    }

}
