package com.craftmend.openaudiomc.velocity.modules.commands.subcommand;


import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.node.enums.ProxiedCommand;
import com.craftmend.openaudiomc.generic.node.packets.CommandProxyPacket;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.proxy.objects.CommandProxyPayload;
import com.velocitypowered.api.proxy.Player;

public class VelocityVoiceCommand extends SubCommand {

    public VelocityVoiceCommand() {
        super("voice");
        registerArguments(
                new Argument("extend", "Renew your moderation lease"),
                new Argument("mod", "Toggle moderation mode for voicechat"),
                new Argument("inspect <username>", "Open the moderation menu to view the status of a player or ban them")
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        // pass on to the spigot server
        if (sender.getOriginal() instanceof Player) {

            CommandProxyPayload payload = new CommandProxyPayload();
            payload.setExecutor(sender.getUniqueId());
            payload.setArgs(args);
            payload.setProxiedCommand(ProxiedCommand.VOICE);

            OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(sender,  new CommandProxyPacket(payload));
        }
    }
}
