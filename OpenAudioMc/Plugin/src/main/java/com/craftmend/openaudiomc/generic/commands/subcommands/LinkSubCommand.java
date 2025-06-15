package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.helpers.PromptProxyError;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import com.craftmend.openaudiomc.generic.rest.types.ClaimCodeResponse;
import com.craftmend.openaudiomc.generic.user.User;

public class LinkSubCommand extends SubCommand {

    public LinkSubCommand() {
        super("link", "login", "account", "claim");
        registerArguments(
                new Argument("", "Generates a link for you to claim your account")
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) {
            PromptProxyError.sendTo(sender);
            return;
        }

        // init connection so we receive the event
        OpenAudioMc.resolveDependency(TaskService.class).runAsync(() -> OpenAudioMc.getService(NetworkingService.class).connectIfDown());

        message(sender, OaColor.GRAY + "Generating link...");

        RestRequest<ClaimCodeResponse> request = new RestRequest<>(ClaimCodeResponse.class, Endpoint.CLAIM_CODE);

        request.runAsync()
                .thenAccept(state -> {
                    if (state.hasError()) {
                        message(sender, OaColor.RED + state.getError().getMessage());
                        return;
                    }

                    ClaimCodeResponse response = state.getResponse();
                    String url = response.getClaimUrl();

                    message(sender, "Successfully generated a link for you to claim your account!");
                    sender.sendClickableUrlMessage(
                            OaColor.GOLD + " >> Click here to claim your account << ",
                            "Click here to claim your account",
                            url
                    );
                    sender.sendMessage(OaColor.GRAY + " >> or visit " + url);
                });

    }

}
