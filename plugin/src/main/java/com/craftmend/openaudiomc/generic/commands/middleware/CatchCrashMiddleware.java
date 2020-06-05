package com.craftmend.openaudiomc.generic.commands.middleware;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;

public class CatchCrashMiddleware implements CommandMiddleware {
    @Override
    public boolean continueCommand(GenericExecutor genericExecutor, SubCommand subCommand) {
        if (!OpenAudioMc.getInstance().getAuthenticationService().isSuccessful()) {
            genericExecutor.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + OpenAudioMc.getInstance().getAuthenticationService().getFailureMessage());
            return false;
        }
        return true;
    }
}
