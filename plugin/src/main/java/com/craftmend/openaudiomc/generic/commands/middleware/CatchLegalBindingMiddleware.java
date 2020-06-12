package com.craftmend.openaudiomc.generic.commands.middleware;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.core.interfaces.ConfigurationImplementation;
import com.craftmend.openaudiomc.generic.core.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.platform.Platform;

import java.util.ArrayList;
import java.util.List;

public class CatchLegalBindingMiddleware implements CommandMiddleware {
    @Override
    public boolean continueCommand(GenericExecutor genericExecutor, SubCommand subCommand) {
        ConfigurationImplementation config = OpenAudioMc.getInstance().getConfigurationImplementation();

        // skip if its a slave
        if (OpenAudioMc.getInstance().getInvoker().isSlave()) return true;

        if (config.getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            List<String> lines = new ArrayList<>();
            lines.add(Platform.translateColors("&eWelcome to OpenAudioMc!"));
            lines.add(Platform.translateColors("&2You have to accept our &5Privacy and Terms Of Service&2 before you can start using the plugin."));
            lines.add(Platform.translateColors("&7(this probably wont change anything for you, unless you were doing some rather weird things)"));
            lines.add(Platform.translateColors("> https://github.com/Mindgamesnl/OpenAudioMc/blob/master/LICENCE_and_PRIVACY.md"));
            lines.add("");
            lines.add(Platform.translateColors("&2To accept, type &6/oa accept"));

            for (String line : lines) {
                genericExecutor.sendMessage(OpenAudioMc.getInstance().getCommandModule().getCommandPrefix() + line);
            }
            return false;
        }
        return true;
    }
}
