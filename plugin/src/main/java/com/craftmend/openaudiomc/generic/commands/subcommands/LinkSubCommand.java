package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.craftmend.response.EmailResponse;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.data.RestErrorResponse;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.platform.Platform;

public class LinkSubCommand extends SubCommand {


    public LinkSubCommand() {
        super("link");
        registerArguments(
                new Argument("<fingerprint>",
                        "Link your Craftmend account")
        );
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {

        if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) {
            message(sender, Platform.makeColor("RED") + "WARNING! This command can only be executed on you top-level server.");
            return;
        }

        if (args.length != 2) {
            if (OpenAudioMc.getInstance().getCraftmendService().is(CraftmendTag.CLAIMED) && !args[1].equalsIgnoreCase("confirm")) {
                message(sender, Platform.makeColor("RED") + "WARNING! This server is already claimed by another account, this means that it'll be transferred and that the old account will lose access. Please use");
                message(sender, Platform.makeColor("GOLD") + "/oa link <fingerprint> confirm");
                message(sender, Platform.makeColor("RED") + "If you want to overwrite your existing account.");
                return;
            }
        }

        if (args.length >= 1) {
            // do
            OpenAudioMc.getInstance().getTaskProvider().runAsync(() -> {
                message(sender, Platform.makeColor("GREEN") + "Attempting to link account, please wait..");
                RestRequest linkRequest = new RestRequest(RestEndpoint.ACCOUNT_CLAIM_SERVER);
                linkRequest.setQuery("fingerprint", args[0]);

                ApiResponse response = linkRequest.executeInThread();

                if (response.getErrors().isEmpty()) {
                    message(sender, Platform.makeColor("GREEN") + "This OpenAudioMc installation is now linked to " + response.getResponse(EmailResponse.class).getEmail());
                    OpenAudioMc.getInstance().getCraftmendService().syncAccount();
                } else {
                    for (RestErrorResponse error : response.getErrors()) {
                        message(sender, Platform.makeColor("RED") + error.getMessage());
                    }
                }
            });
        } else {
            message(sender, Platform.makeColor("RED") + "You need a fingerprint to use this command. You can get one on this page https://account.craftmend.com/account/fingerprint");
        }

    }
}
