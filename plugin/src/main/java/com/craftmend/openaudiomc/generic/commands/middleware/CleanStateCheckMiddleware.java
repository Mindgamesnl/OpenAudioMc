package com.craftmend.openaudiomc.generic.commands.middleware;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.CommandMiddleware;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.enviroment.MagicValue;
import com.craftmend.openaudiomc.generic.user.User;

public class CleanStateCheckMiddleware implements CommandMiddleware {

    @Override
    public boolean continueCommand(User genericExecutor, SubCommand subCommand) {
        if (!OpenAudioMc.getInstance().isCleanStartup()) {
            genericExecutor.sendMessage(MagicValue.COMMAND_PREFIX.get(String.class) + "It looks like that OpenAudioMc didn't start up smoothly due to a plugin/server reload. To prevent further damage, the plugin has now disabled itself. Please restart your server to re-activate the plugin. If this message keeps popping up (even after a clean restart), please contact the developer in the Discord server.");
            return false;
        }
        return true;
    }

}
