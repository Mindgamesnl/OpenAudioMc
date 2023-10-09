package com.craftmend.openaudiomc.vistas.client.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.vistas.client.client.VistasRedisClient;
import com.craftmend.openaudiomc.vistas.client.redis.packets.EvalCommandPacket;

public class VistasLinkCommand extends SubCommand {

    public VistasLinkCommand() {
        super("link", "login", "account", "claim");
        registerArguments(
                new Argument("", "Generates a link for you to claim your account")
        );
    }

    @Override
    public void onExecute(User user, String[] strings) {
        message(user, "Generating link through vistas...");
        OpenAudioMc.getService(VistasRedisClient.class).sendPacket(new EvalCommandPacket(user.getUniqueId(), new String[]{"link"}));
    }
}
