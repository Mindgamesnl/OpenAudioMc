package com.craftmend.openaudiomc.velocity.modules.commands.subcommand;

import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.node.enums.CommandProxy;
import com.craftmend.openaudiomc.generic.node.packets.CommandProxyPacket;
import com.craftmend.openaudiomc.spigot.modules.proxy.objects.CommandProxyPayload;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.velocitypowered.api.proxy.Player;
import me.fluse1367.port.com.ikeirnez.pluginmessageframework.PacketPlayer;

public class VelocitySpeakerCommand extends SubCommand {

    public VelocitySpeakerCommand() {
        super("speaker");
        registerArguments(
                new Argument("<source>",
                        "Gives you a speaker block which you can place anywhere in the world. " +
                                "The speaker will play the sound you entered in the argument"),

                new Argument("set <world> <x> <y> <z> <url>",
                        "Force place a speaker on a location, no interactions required"),
                new Argument("remove <world> <x> <y> <z>",
                        "Delete a speaker on a location")
        );
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {
        // pass on to the spigot server
        if (sender.getOriginal() instanceof Player) {
            Player player = (Player) sender.getOriginal();

            CommandProxyPayload payload = new CommandProxyPayload();
            payload.setExecutor(player.getUniqueId());
            payload.setArgs(args);
            payload.setCommandProxy(CommandProxy.SPEAKER);

            OpenAudioMcVelocity.getInstance().getNodeManager().getPacketManager()
                    .sendPacket(new PacketPlayer(player), new CommandProxyPacket(payload));
        }
    }
}
