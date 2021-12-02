package com.craftmend.openaudiomc.spigot.modules.commands.subcommands.voice;

import com.craftmend.openaudiomc.generic.client.ClientDataService;
import com.craftmend.openaudiomc.generic.client.store.ClientDataStore;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.mojang.MojangLookupService;
import com.craftmend.openaudiomc.generic.mojang.store.MojangProfile;
import com.craftmend.openaudiomc.generic.networking.rest.Task;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.platform.interfaces.TaskService;
import com.craftmend.openaudiomc.generic.user.User;
import org.bukkit.entity.Player;

import java.util.UUID;

public class VoiceModSubCommand extends SubCommand {

    public VoiceModSubCommand() {
        super("mod");
        this.trimArguments = true;
    }

    @Override
    public void onExecute(User sender, String[] args) {
        if (!(sender.getOriginal() instanceof Player)) {
            message(sender, "Only players can open moderation menu's.");
            return;
        }

        if (args.length == 0) {
            message(sender, "Please specify the name of the player you want to inspect");
            return;
        }

        message(sender, "Fetching cached profile...");
        Task<MojangProfile> mojangFetch = getService(MojangLookupService.class).getByName(args[0]);

        mojangFetch.setWhenFailed(((errorCode, s) -> {
            message(sender, OaColor.RED + "There's no record of that player ever joining this server");
        }));

        mojangFetch.setWhenFinished(mojangProfile -> {
            message(sender, OaColor.GRAY + "Loading client data from " + mojangProfile.getUuid().toString() + "...");
            Task<ClientDataStore> clientDataRequest = getService(ClientDataService.class)
                    .getClientData(mojangProfile.getUuid(), false, false);

            clientDataRequest.setWhenFailed(((errorCode, s) -> {
                message(sender, OaColor.RED + "Failed to load profile data...");
            }));

            clientDataRequest.setWhenFinished(clientDataStore -> {
                handleMod(sender, args, clientDataStore, mojangProfile.getUuid(), mojangProfile.getName());
            });
        });
    }

    public void handleMod(User sender, String[] args, ClientDataStore target, UUID targetId, String targetName) {
        message(sender, OaColor.GREEN + "Opening profile");
        resolveDependency(TaskService.class).runSync(() -> {
            new VoiceModGui((Player) sender.getOriginal(), target, targetId, targetName);
        });
    }

}
