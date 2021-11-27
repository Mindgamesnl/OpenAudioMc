package com.craftmend.openaudiomc.generic.commands.middleware;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.generic.user.User;

public class CatchCrashMiddleware implements CommandMiddleware {
    @Override
    public boolean continueCommand(User genericExecutor, SubCommand subCommand) {
        if (!OpenAudioMc.getService(AuthenticationService.class).isSuccessful()) {
            genericExecutor.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + OpenAudioMc.getService(AuthenticationService.class).getFailureMessage());
            return false;
        }
        return true;
    }
}
