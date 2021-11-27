package com.craftmend.openaudiomc.bungee.modules.commands.subcommand;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.bungee.modules.node.NodeManager;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.node.enums.CommandProxy;
import com.craftmend.openaudiomc.generic.node.packets.CommandProxyPacket;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.proxy.objects.CommandProxyPayload;
import com.craftmend.openaudiomc.velocity.messages.PacketPlayer;
import net.md_5.bungee.api.connection.ProxiedPlayer;

public class BungeeSpeakerCommand extends SubCommand {

    /**
     * A simple bungeecord command that forwards the speaker command
     * to the underlying spigot server.
     *
     * This is because bungeecord doesn't actually store any server data, and the media service
     * is running on the spigot instance anyway
     */

    public BungeeSpeakerCommand() {
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
    public void onExecute(User sender, String[] args) {
        // pass on to the spigot server
        if (sender.getOriginal() instanceof ProxiedPlayer) {
            ProxiedPlayer player = (ProxiedPlayer) sender.getOriginal();

            CommandProxyPayload payload = new CommandProxyPayload();
            payload.setExecutor(player.getUniqueId());
            payload.setArgs(args);
            payload.setCommandProxy(CommandProxy.SPEAKER);

            OpenAudioMc.getService(NodeManager.class).getPacketManager().sendPacket(new PacketPlayer(player), new CommandProxyPacket(payload));
        }
    }
}
