package com.craftmend.openaudiomc.bungee.modules.commands.subcommand;

import com.craftmend.openaudiomc.OpenAudioMc;

import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.node.enums.ProxiedCommand;
import com.craftmend.openaudiomc.generic.node.packets.CommandProxyPacket;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.proxy.objects.CommandProxyPayload;
import net.md_5.bungee.api.connection.ProxiedPlayer;

public class BungeeAliasCommand extends SubCommand {

    /**
     * A simple bungeecord command that forwards the alias command
     * to the underlying spigot server.
     *
     * This is because bungeecord doesn't actually store any server data, and the media service
     * is running on the spigot instance anyway
     */

    public BungeeAliasCommand() {
        super("alias");
        registerArguments(
                new Argument("<alias name> <source>",
                        "Register a Alias for a source URL so you can easaly memorize them and can paste them onto signs without having to type a complete dictionary." +
                                " When an alias like onride_music is set, you can trigger it by using a:onride_music as your source."),

                new Argument("delete <alias name>",
                        "Delete a alias from the database. This will also remove it from the memory cache."),

                new Argument("resolve <alias name>", "Resolve a alias to see what it's target is.")
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
            payload.setProxiedCommand(ProxiedCommand.ALIAS);

            OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(sender, new CommandProxyPacket(payload));
        }
    }
}
