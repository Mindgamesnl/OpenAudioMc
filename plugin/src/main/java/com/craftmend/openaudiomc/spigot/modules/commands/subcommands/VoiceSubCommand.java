package com.craftmend.openaudiomc.spigot.modules.commands.subcommands;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;

import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.mojang.MojangLookupService;
import com.craftmend.openaudiomc.generic.networking.interfaces.NetworkingService;
import com.craftmend.openaudiomc.generic.user.User;

public class VoiceSubCommand extends SubCommand {

    public VoiceSubCommand() {
        super("voice", "vc", "voicechat", "proximity", "pv");
    }

    @Override
    public void onExecute(User sender, String[] args) {
        MojangLookupService mojangLookupService = getService(MojangLookupService.class);
        CraftmendService craftmendService = getService(CraftmendService.class);
        NetworkingService networkingService = getService(NetworkingService.class);


    }
}
