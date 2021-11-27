package com.craftmend.openaudiomc.bungee.modules.commands.subcommand;

import com.craftmend.openaudiomc.OpenAudioMc;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.node.enums.CommandProxy;
import com.craftmend.openaudiomc.generic.node.packets.CommandProxyPacket;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.proxy.objects.CommandProxyPayload;
import net.md_5.bungee.api.connection.ProxiedPlayer;

public class BungeeShowCommand extends SubCommand {

    /**
     * A simple bungeecord command that forwards the show command
     * to the underlying spigot server.
     *
     * This is because bungeecord doesn't actually store any server data, and the media service
     * is running on the spigot instance anyway
     */

    public BungeeShowCommand() {
        super("show");
        registerArguments(

                new Argument("create <show name>",
                        "Create a new show"),

                new Argument("gui <show name>",
                        "Open the show editor"),

                new Argument("start <show name>",
                        "Start a show"),

                new Argument("loop <show name>",
                        "Start to loop a show until the server stops or the show is cancelled"),

                new Argument("cancel <show name>",
                        "Cancel a running show"),

                new Argument("add <show name> <time in MS> <type> <data...>",
                        "Add a task/cue to a show"),

                new Argument("info <show name>",
                        "Display info about a show")
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
            payload.setCommandProxy(CommandProxy.SHOW);

            OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(sender, new CommandProxyPacket(payload));
        }
    }
}
