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

public class VelocityPlaylistCommand extends SubCommand {

    public VelocityPlaylistCommand() {
        super("playlist", "list");
        registerArguments(
                new Argument("create <playlistName>", "create a new playlist"),
                new Argument("delete <playlistName>", "delete a playlist"),
                new Argument("list", "list all playlists"),
                new Argument("remove <playlistName> <index>", "remove a track from a playlist"),
                new Argument("view <playlistName>", "view a playlist contents"),
                new Argument("add <playlistName> <source>", "add a track to a playlist")
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        // pass on to the spigot server
        if (sender.getOriginal() instanceof Player) {

            CommandProxyPayload payload = new CommandProxyPayload();
            payload.setExecutor(sender.getUniqueId());
            payload.setArgs(args);
            payload.setProxiedCommand(ProxiedCommand.PLAYLIST);

            OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(sender,  new CommandProxyPacket(payload));
        }
    }

}
