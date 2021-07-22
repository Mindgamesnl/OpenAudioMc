package com.craftmend.openaudiomc.generic.commands.middleware;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.authentication.AuthenticationService;
import com.craftmend.openaudiomc.generic.commands.CommandService;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;

public class CatchCrashMiddleware implements CommandMiddleware {
    @Override
    public boolean continueCommand(GenericExecutor genericExecutor, SubCommand subCommand) {
        if (!OpenAudioMc.getService(AuthenticationService.class).isSuccessful()) {
            genericExecutor.sendMessage(OpenAudioMc.getService(CommandService.class).getCommandPrefix() + OpenAudioMc.getService(AuthenticationService.class).getFailureMessage());
            return false;
        }
        return true;
    }
}
