package com.craftmend.openaudiomc.generic.commands.middleware;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.subcommands.AcceptSubCommand;
import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.storage.interfaces.Configuration;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.platform.Platform;

import java.util.ArrayList;
import java.util.List;

public class CatchLegalBindingMiddleware implements CommandMiddleware {
    @Override
    public boolean continueCommand(User genericExecutor, SubCommand subCommand) {
        Configuration config = OpenAudioMc.getInstance().getConfiguration();

        // skip if its a node
        if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) return true;

        // allow the accept command
        if (subCommand != null) {
            if (subCommand instanceof AcceptSubCommand) return true;
        }

        if (!config.getBoolean(StorageKey.LEGAL_ACCEPTED_TOS_AND_PRIVACY)) {
            List<String> lines = new ArrayList<>();
            lines.add(Platform.translateColors("&eWelcome to OpenAudioMc!"));
            lines.add(Platform.translateColors("&2You have to accept our &5Privacy and Terms Of Service&2 before you can start using the plugin."));
            lines.add(Platform.translateColors("&7(this probably wont change anything for you, unless you were doing some rather weird things)"));
            lines.add(Platform.translateColors("> https://github.com/Mindgamesnl/OpenAudioMc/blob/master/LICENCE_and_PRIVACY.md"));
            lines.add("");
            lines.add(Platform.translateColors("&2To accept, type &6/oa accept"));

            for (String line : lines) {
                genericExecutor.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + line);
            }
            return false;
        }
        return true;
    }
}
