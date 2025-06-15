package com.craftmend.openaudiomc.generic.commands.helpers;

import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.user.User;

public class PromptProxyError {

    public static void sendTo(User sender) {
        sender.sendMessage(OaColor.RED + "WARNING! This OpenAudioMc can't accept links, because it's running in node mode.");
        sender.sendMessage(OaColor.YELLOW + "If you run a proxy (Bunguard, Velocity, Waterfall, etc), then:");
        sender.sendMessage(OaColor.GRAY + " - Install the plugin on your proxy, if you have one.");
        sender.sendMessage(OaColor.YELLOW + "Or, if you don't run one or don't know what this means:");
        sender.sendMessage(OaColor.GRAY + " - Enable " + Platform.makeColor("WHITE") + "force-offline-mode" + Platform.makeColor("RED") + " in the config.yml if your host doesn't support proxies.");
        sender.sendClickableCommandMessage(
                Platform.makeColor("RED") + " - Or click here to do it automatically, but you need to restart your server after doing this.",
                "Automatically enable force-offline-mode",
                "oa setkv SETTINGS_FORCE_OFFLINE_MODE true"
        );
    }

}
