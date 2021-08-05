package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.platform.Platform;

import java.util.Set;

public class VoiceSubCommand extends SubCommand {

    public VoiceSubCommand() {
        super("voice", "vc", "voicechat", "proximity", "pv");
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {

        // does this server have voice chat?
        Set<CraftmendTag> tags = OpenAudioMc.getService(CraftmendService.class).getTags();
        boolean hasVoiceChat = tags.contains(CraftmendTag.VOICECHAT);

        /*
         * Create a TODO table with steps before starting voice chat
         */
        if (!hasVoiceChat) {
            message(sender, Platform.makeColor("RED") + " This server doesn't have voice chat enabled. Please complete complete the following steps before using this feature:");

            // check claim
            if (!tags.contains(CraftmendTag.CLAIMED)) {
                message(sender, Platform.makeColor("YELLOW") + "  -> Create an account on https://account.craftmend.com/");
                message(sender, Platform.makeColor("YELLOW") + "  -> Link your account and server using /oa link");
            }

            message(sender, Platform.makeColor("YELLOW") + "  -> Claim and activate the VoiceChat addon on https://account.craftmend.com/account/addons");
            message(sender, Platform.makeColor("YELLOW") + "  -> Restart your server");
            return;
        }

    }
}
