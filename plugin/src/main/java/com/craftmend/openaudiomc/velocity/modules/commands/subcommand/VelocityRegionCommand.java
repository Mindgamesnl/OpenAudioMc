package com.craftmend.openaudiomc.velocity.modules.commands.subcommand;


import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.node.enums.CommandProxy;
import com.craftmend.openaudiomc.generic.node.packets.CommandProxyPacket;
import com.craftmend.openaudiomc.generic.player.User;
import com.craftmend.openaudiomc.spigot.modules.proxy.objects.CommandProxyPayload;
import com.craftmend.openaudiomc.velocity.OpenAudioMcVelocity;
import com.velocitypowered.api.proxy.Player;
import com.craftmend.openaudiomc.velocity.messages.PacketPlayer;

public class VelocityRegionCommand extends SubCommand {

    public VelocityRegionCommand() {
        super("region");
        registerArguments(
                new Argument("create <WG-region> <source>",
                        "Assigns a sound to a WorldGuard region by name"),

                new Argument("delete <WG-region>",
                        "Unlink the sound from a WorldGuard specific region by name")
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        // pass on to the spigot server
        if (sender.getOriginal() instanceof Player) {
            Player player = (Player) sender.getOriginal();

            CommandProxyPayload payload = new CommandProxyPayload();
            payload.setExecutor(player.getUniqueId());
            payload.setArgs(args);
            payload.setCommandProxy(CommandProxy.REGION);
            OpenAudioMcVelocity.getInstance().getNodeManager().getPacketManager().sendPacket(new PacketPlayer(player), new CommandProxyPacket(payload));
        }
    }
}
