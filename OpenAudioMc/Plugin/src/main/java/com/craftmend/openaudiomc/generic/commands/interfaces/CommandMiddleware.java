package com.craftmend.openaudiomc.generic.commands.interfaces;

import com.craftmend.openaudiomc.api.user.User;

public interface CommandMiddleware {

    boolean continueCommand(User genericExecutor, SubCommand subCommand);

}
