package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.data.RestErrorResponse;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.voicechat.bus.VoiceApiConnection;
import com.craftmend.openaudiomc.generic.voicechat.services.VoiceLicenseService;
import com.craftmend.openaudiomc.generic.voicechat.services.enums.LicenseRequestResponse;

import java.util.Set;

public class VoiceSubCommand extends SubCommand {

    private boolean isRunning = false;

    public VoiceSubCommand() {
        super("voice", "vc", "voicechat", "proximity", "pv");
    }

    @Override
    public void onExecute(User sender, String[] args) {

        // does this server have voice chat?
        Set<CraftmendTag> tags = OpenAudioMc.getService(CraftmendService.class).getTags();
        boolean hasVoiceChat = tags.contains(CraftmendTag.VOICECHAT);

        if (!hasVoiceChat) {

            // are we already claimed?
            if (tags.contains(CraftmendTag.CLAIMED)) {
                message(sender, Platform.makeColor("RED") + "This server is already linked to a craftmend account, meaning that it isn't possible to activate voicechat from in-game. Please navigate to https://account.craftmend.com/account/addons and try claiming a license there.");
                return;
            } else {
                // we aren't! meaning that we could try it here.
                if (args.length != 0 && args[0].equalsIgnoreCase("claim")) {
                    VoiceLicenseService licenseService = OpenAudioMc.getService(VoiceLicenseService.class);

                    message(sender, OaColor.GRAY + "Trying to obtain a license automatically..");
                    licenseService.requestLicense().setWhenFinished(response -> {
                        if (response.getCode() == LicenseRequestResponse.Code.ALREADY_RUNNING) {
                            message(sender, OaColor.GRAY + "A pending request is already being made. please wait");
                            return;
                        }

                        if (response.getCode() == LicenseRequestResponse.Code.GRANTED) {
                            message(sender, OaColor.GREEN + "Successfully activated voicechat! enjoy your free license. The license will expire tomorrow, please link a craftmend account to extend it to the full month.");
                            return;
                        }

                        message(sender, OaColor.RED + "Something went wrong while trying to request a licence.");
                        for (RestErrorResponse error : response.getErrors()) {
                            message(sender, OaColor.YELLOW + " > " + OaColor.RED + error.getMessage());
                        }
                    });

                } else {
                    // explain what's up
                    message(sender, Platform.makeColor("YELLOW") + "Hey there, welcome to OpenAudioMc's proximity voice chat!");
                    message(sender, "You don't have your server linked to a Craftmend Account yet, but you're able to request a temporary license to get started!");
                    message(sender, "(you'll have to claim your server with an account within 1 day to keep your license for the rest of the month)");
                    message(sender, "To request a license, run " + Platform.makeColor("GREEN") + "/oa voice claim");
                }
            }
            return;
        }

        if (args.length == 0) {
            VoiceApiConnection voiceService = OpenAudioMc.getService(CraftmendService.class).getVoiceApiConnection();
            message(sender, Platform.makeColor("GREEN") + "VoiceChat is enabled and ready to go");
            message(sender, Platform.makeColor("GREEN") + "  -> Slots: " + voiceService.getUsedSlots() + "/" + voiceService.getMaxSlots());
            return;
        }


    }
}
