package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.craftmend.enums.CraftmendTag;
import com.craftmend.openaudiomc.generic.craftmend.response.EmailResponse;
import com.craftmend.openaudiomc.generic.networking.rest.RestRequest;
import com.craftmend.openaudiomc.generic.networking.rest.data.RestErrorResponse;
import com.craftmend.openaudiomc.generic.networking.rest.endpoints.RestEndpoint;
import com.craftmend.openaudiomc.generic.networking.rest.interfaces.ApiResponse;
import com.craftmend.openaudiomc.generic.platform.Platform;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.player.User;

public class LinkSubCommand extends SubCommand {

    private boolean isPending = false;

    public LinkSubCommand() {
        super("link", "setup");
        registerArguments(
                new Argument("<fingerprint>",
                        "Link your Craftmend account")
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        CommandArguments arguments = new CommandArguments(args);

        if (isPending) {
            message(sender, Platform.makeColor("RED") + "This action is already running...");
        }

        if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) {
            message(sender, Platform.makeColor("RED") + "WARNING! This command can only be executed on you top-level server.");
            return;
        }

        if (OpenAudioMc.getService(CraftmendService.class).is(CraftmendTag.CLAIMED) && !arguments.getSaveString(1).equalsIgnoreCase("confirm")) {
            message(sender, Platform.makeColor("RED") + "WARNING! This server is already claimed by another account, this means that it'll be transferred and that the old account will lose access. Please use");
            message(sender, Platform.makeColor("GOLD") + "/oa link <fingerprint> confirm");
            message(sender, Platform.makeColor("RED") + "If you want to overwrite your existing account.");
            return;
        }

        if (args.length >= 1) {
            // do
            isPending = true;
            OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> {
                message(sender, Platform.makeColor("GREEN") + "Attempting to link account, please wait..");
                RestRequest linkRequest = new RestRequest(RestEndpoint.ACCOUNT_CLAIM_SERVER);
                linkRequest.setQuery("fingerprint", args[0]);

                ApiResponse response = linkRequest.executeInThread();

                if (response.getErrors().isEmpty()) {
                    message(sender, Platform.makeColor("GREEN") + "This OpenAudioMc installation is now linked to " + response.getResponse(EmailResponse.class).getEmail());
                    OpenAudioMc.getService(CraftmendService.class).syncAccount();
                } else {
                    for (RestErrorResponse error : response.getErrors()) {
                        message(sender, Platform.makeColor("RED") + error.getMessage());
                    }
                }
                isPending = false;
            });
        } else {
            message(sender, Platform.makeColor("RED") + "You need a fingerprint to use this command. You can get one on this page https://account.craftmend.com/account/fingerprint");
        }

    }
}
