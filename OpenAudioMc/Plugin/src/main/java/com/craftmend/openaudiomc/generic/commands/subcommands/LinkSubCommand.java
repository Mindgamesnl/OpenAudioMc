package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.api.basic.ActorCategory;
import com.craftmend.openaudiomc.generic.commands.helpers.PromptProxyError;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.rest.RestRequest;
import com.craftmend.openaudiomc.generic.rest.routes.Endpoint;
import com.craftmend.openaudiomc.generic.rest.types.ClaimCodeResponse;
import com.craftmend.openaudiomc.api.user.User;

import java.time.Duration;
import java.time.Instant;

public class LinkSubCommand extends SubCommand {

    private Instant lastLinkGeneration = Instant.MIN;

    public LinkSubCommand() {
        super("link", "login", "account", "claim");
        registerArguments(
                new Argument("", "Generates a link for you to claim your account")
        );
        ignorePermissions = true;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (OpenAudioMc.getInstance().getInvoker().isNodeServer()) {
            PromptProxyError.sendTo(sender);
            return;
        }

        boolean isPlayer = sender.getCategory() == ActorCategory.PLAYER;
        boolean isPrivileged = isAllowed(sender);

        // if the sender is allowed, we can just enter normal behavior
        if (isPrivileged) {
            onExecutePrivileged(sender);
            return;
        }

        // if the sender is a player, but they likely do not understand how permissions work, we can give them a more friendly message
        if (isPlayer) {
            int minutesSinceLastGeneration = Math.toIntExact(Duration.between(lastLinkGeneration, Instant.now()).toMinutes());

            if (minutesSinceLastGeneration < 5) {
                message(sender, OaColor.RED + "You have to wait " + (5 - minutesSinceLastGeneration) + " more minute(s) before you can generate a new link.");
                return;
            }

            lastLinkGeneration = Instant.now();
            message(sender, OaColor.GREEN + "Welcome to OpenAudioMc!");
            message(sender, OaColor.GRAY + "To get started, please go to the logs of your " + OpenAudioMc.getInstance().getPlatform().getReadableName() + " server");
            message(sender, OaColor.GRAY + "There, you will find a link to claim your account and get started.");

            RestRequest<ClaimCodeResponse> request = new RestRequest<>(ClaimCodeResponse.class, Endpoint.CLAIM_CODE);
            request.runAsync()
                    .thenAccept(state -> {
                        if (state.hasError()) {
                            message(sender, OaColor.RED + state.getError().getMessage());
                            return;
                        }

                        ClaimCodeResponse response = state.getResponse();
                        String url = response.getClaimUrl();

                        OpenAudioLogger.info("============== [ OpenAudioMc ] ==============");
                        OpenAudioLogger.info("To get started with OpenAudioMc, please visit the following link:");
                        OpenAudioLogger.info(url);
                        OpenAudioLogger.info("This link will allow you to claim your account and get started.");
                        OpenAudioLogger.info("=============================================");
                    });
            return;
        }

        message(sender, OaColor.RED + "You do not have permission to execute this command. Please make sure you have admin permission on your " + OpenAudioMc.getInstance().getPlatform().getReadableName());
    }

    private void onExecutePrivileged(User sender) {
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
