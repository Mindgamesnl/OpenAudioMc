package com.craftmend.openaudiomc.vistas.client.commands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.vistas.client.client.VistasRedisClient;
import com.craftmend.openaudiomc.vistas.client.redis.packets.EvalCommandPacket;

public class VistasEvalCommand extends SubCommand {

    public VistasEvalCommand() {
        super("vistas-eval");
        registerArguments(new Argument("", "Run a command on the vistas server"));
    }

    @Override
    public void onExecute(User user, String[] strings) {
        user.sendMessage("Sending command to deputy..");
        OpenAudioMc.getService(VistasRedisClient.class).sendPacket(new EvalCommandPacket(user.getUniqueId(), strings));
    }
}
